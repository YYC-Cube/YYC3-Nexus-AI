import { NextRequest, NextResponse } from "next/server"

const PROVIDER_BASE_URLS: Record<string, string> = {
  openai: "https://api.openai.com/v1",
  deepseek: "https://api.deepseek.com/v1",
}

function getEnvConfig(provider: string) {
  const upper = provider.toUpperCase()
  const apiKey = process.env[`${upper}_API_KEY`] || process.env.OPENAI_API_KEY || ""
  const baseURL = process.env[`${upper}_BASE_URL`] || PROVIDER_BASE_URLS[provider] || PROVIDER_BASE_URLS.openai
  return { apiKey, baseURL }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { provider, model, messages, temperature, maxTokens, stream } = body

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "messages is required" }, { status: 400 })
    }

    const { apiKey, baseURL } = getEnvConfig(provider || "openai")

    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured on server" }, { status: 500 })
    }

    const apiResponse = await fetch(`${baseURL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model || "gpt-4",
        messages,
        temperature: temperature ?? 0.7,
        max_tokens: maxTokens ?? 2000,
        stream: !!stream,
      }),
    })

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text()
      return NextResponse.json(
        { error: `AI API error: ${apiResponse.status} ${errorText}` },
        { status: apiResponse.status }
      )
    }

    if (stream) {
      const encoder = new TextEncoder()
      const readable = new ReadableStream({
        async start(controller) {
          const reader = apiResponse.body?.getReader()
          if (!reader) {
            controller.close()
            return
          }
          const decoder = new TextDecoder()
          try {
            while (true) {
              const { done, value } = await reader.read()
              if (done) break
              controller.enqueue(encoder.encode(decoder.decode(value, { stream: true })))
            }
          } catch {
            controller.error(new Error("Stream interrupted"))
          } finally {
            controller.close()
          }
        },
      })

      return new NextResponse(readable, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      })
    }

    const data = await apiResponse.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
