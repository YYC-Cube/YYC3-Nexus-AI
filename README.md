<div align="center">

<img src="public/YYC3-Family.png" alt="YYC³ Family" width="100%" />

# YYC³ NexusAI

**言启千行代码 · 语枢万物智能**

[![Next.js](https://img.shields.io/badge/Next.js-16.2-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![pnpm](https://img.shields.io/badge/pnpm-10-F69220?style=flat-square&logo=pnpm&logoColor=white)](https://pnpm.io/)
[![Node.js](https://img.shields.io/badge/Node.js-22-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](CONTRIBUTING.md)
[![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub_Actions-2088FF?style=flat-square&logo=github-actions&logoColor=white)](https://github.com/YYC-Cube/YYC3-Nexus-AI/actions)
[![Code Quality](https://img.shields.io/badge/code_quality-A+-success?style=flat-square)](docs/04-测试审核阶段/0406-质量审核/代码质量审核标准.md)
[![Components](https://img.shields.io/badge/components-72-blueviolet?style=flat-square)](components/)
[![LOC](https://img.shields.io/badge/lines_of_code-34K+-informational?style=flat-square)]()
[![Domain](https://img.shields.io/badge/domain-nexus--ai.yyc3.top-9cf?style=flat-square)](https://nexus-ai.yyc3.top)
[![i18n](https://img.shields.io/badge/i18n-zh%20%7C%20en-ff6b6b?style=flat-square)](lib/i18n.ts)

### 多模型聚合 · 下一代智能开发与对话中枢平台

*Multi-Model Aggregation · Next-Gen Intelligent Development & Conversation Hub*

[🌐 Live Demo](https://nexus-ai.yyc3.top) · [🚀 Quick Start](#-quick-start) · [📖 Documentation](#-documentation) · [🛠️ Tech Stack](#-tech-stack) · [🎯 Features](#-core-features) · [🤝 Contributing](#-contributing)

</div>

---

## 🔭 Overview

**YYC³ NexusAI** is a next-generation intelligent development and conversation hub platform powered by YanYuCloudCube™ technology. It aggregates 11+ mainstream AI models to deliver deep code understanding, intelligent generation, adaptive learning, and real-time collaboration in a unified workspace.

> **YanYuCloudCube™** — 言语云立方 — 言启千行代码，语枢万物智能

### Key Highlights

- 🧠 **Multi-Model Aggregation** — GPT-4, Claude, Gemini, DeepSeek, and more in one unified interface
- 🔬 **Deep Code Understanding** — AST parsing, dependency graphs, complexity analysis via Babel
- ⚡ **Intelligent Code Generation** — Context-aware completion, framework-specific scaffolding
- 🛡️ **Defensive Programming** — Security analysis, boundary condition handling, auto-fix suggestions
- 📊 **Adaptive Learning** — Personalized learning paths, progress tracking, knowledge graphs
- 🎨 **Modern UI/UX** — Responsive design, dark mode, typewriter animations, emotion-aware interactions
- 🌐 **i18n Ready** — Built-in Chinese/English bilingual support with extensible locale system

---

## 🚀 Quick Start

### Prerequisites

| Tool | Version |
|------|---------|
| Node.js | ≥ 22 |
| pnpm | ≥ 10 |
| Git | ≥ 2.40 |

### Installation

```bash
git clone https://github.com/YYC-Cube/YYC3-Nexus-AI.git
cd yyc3-ai-bot

pnpm install

cp .env.example .env.local

pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm build
pnpm start
```

---

## 🛠️ Tech Stack

### Core Framework

| Technology | Version | Purpose |
|-----------|---------|---------|
| [Next.js](https://nextjs.org/) | 16.2.6 | Full-stack React framework (App Router) |
| [React](https://react.dev/) | 19 | UI library with Server/Client Components |
| [TypeScript](https://www.typescriptlang.org/) | 5 | Type-safe development |
| [Tailwind CSS](https://tailwindcss.com/) | 4 | Utility-first CSS framework |

### UI & Interaction

| Technology | Purpose |
|-----------|---------|
| [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) | Accessible component primitives |
| [motion](https://motion.dev/) (v12+) | Production animations (formerly Framer Motion) |
| [Lucide React](https://lucide.dev/) | Icon library |
| [Recharts](https://recharts.org/) | Data visualization |
| [ReactFlow](https://reactflow.dev/) | Node-based graph views |
| [cmdk](https://cmdk.paco.me/) | Command palette |
| [Geist](https://vercel.com/font) | Typeface by Vercel |

### AI & Intelligence

| Module | Purpose |
|--------|---------|
| `lib/deep-code-understanding.ts` | AST parsing, code structure analysis |
| `lib/intelligent-code-generator.ts` | Context-aware code generation |
| `lib/natural-language-understanding.ts` | Intent recognition, entity extraction |
| `lib/adaptive-learning-system.ts` | Personalized learning adaptation |
| `lib/code-quality-analyzer.ts` | Multi-dimensional quality scoring |
| `lib/smart-code-assistant.ts` | AI-powered coding assistant |
| `lib/emotional-intelligence.ts` | Emotion-aware interaction |
| `lib/multi-turn-dialog-optimizer.ts` | Conversation context optimization |

### Developer Experience

| Tool | Configuration |
|------|-------------|
| [ESLint](https://eslint.org/) 9 | Flat Config (`eslint.config.mjs`) |
| [PostCSS](https://postcss.org/) | `@tailwindcss/postcss` v4 |
| [pnpm](https://pnpm.io/) | Workspace with peer dependency rules |

---

## 📦 Project Architecture

```
yyc3-ai-bot/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout (YYC³ NexusAI branding)
│   ├── page.tsx                 # Landing page
│   ├── globals.css              # Tailwind v4 + custom theme
│   ├── login/                   # Authentication pages
│   ├── register/
│   ├── settings/
│   └── api/ai/chat/route.ts     # AI chat API endpoint
│
├── components/                   # 72 React components
│   ├── ui/                      # shadcn/ui primitives (14 components)
│   ├── AIAssistantUI.tsx        # AI assistant main interface
│   ├── MainWorkspace.tsx        # Primary workspace layout
│   ├── ChatPane.tsx             # Chat panel with context analysis
│   ├── Composer.tsx             # Message composer with model selector
│   ├── Message.tsx              # Message with typewriter effect
│   ├── Sidebar.tsx              # Navigation sidebar with sections
│   ├── IntegratedWorkspace.tsx  # Integrated development workspace
│   ├── SmartPromptFloater.tsx   # AI-powered prompt suggestions
│   ├── EmotionalFloater.tsx     # Emotion-aware floating UI
│   ├── EnhancedCodeBlock.tsx    # Syntax-highlighted code display
│   ├── MindMapView.tsx          # Mind map visualization
│   ├── LearningPathPlanner.tsx  # Learning path management
│   └── ...                      # 60+ more components
│
├── lib/                          # 53 core library modules
│   ├── intelligent-code-generator.ts    # Smart code generation
│   ├── deep-code-understanding.ts       # Code comprehension engine
│   ├── adaptive-learning-system.ts      # Adaptive learning
│   ├── natural-language-understanding.ts # NLU system
│   ├── code-quality-analyzer.ts         # Quality metrics
│   ├── performance-optimizer.ts         # Performance analysis
│   ├── smart-recommendation-engine.ts   # Context recommendations
│   ├── test-generator.ts                # Auto test generation
│   ├── code-translator.ts               # Cross-language translation
│   ├── framework-specific-generator.tsx # Framework scaffolding
│   ├── i18n.ts                          # Internationalization (zh/en)
│   ├── cicd-pipeline.ts                 # CI/CD integration
│   └── ...                              # 40+ more modules
│
├── contexts/                     # React Context providers
│   └── LocaleContext.tsx         # i18n locale provider
│
├── public/                       # Static assets
│   ├── YYC3-Family.png          # Brand hero image
│   └── yyc3-icons/              # Full-platform icon suite
│       ├── favicon/             # Browser favicons (16/32/96/ico)
│       ├── pwa/                 # PWA icons + manifest.json
│       ├── ios/                 # Apple touch icons (20-1024)
│       ├── android/             # Android launcher icons
│       └── webp/                # WebP optimized icons
│
├── docs/                         # Comprehensive documentation
│   ├── 00-项目总览索引/          # Project overview & index
│   ├── 01-启动规划阶段/          # Planning phase docs
│   ├── 02-项目设计阶段/          # Design phase docs
│   ├── 03-开发实施阶段/          # Development phase docs
│   ├── 04-测试审核阶段/          # Testing & review docs
│   ├── 05-交付部署阶段/          # Delivery & deployment docs
│   ├── FULL_CHAIN_AUDIT_REPORT.md
│   ├── ARCHITECTURE.md
│   └── api/                     # API documentation
│
└── .github/workflows/            # CI/CD pipelines
    └── main.yml                 # Build, lint, test, deploy
```

---

## 🎯 Core Features

### Intelligent Conversation System

```
User Input → NLU Engine → Intent Recognition → Context Analysis → AI Response
                ↓              ↓                    ↓
          Entity Extraction  Sentiment        Multi-Model Routing
```

- Multi-turn dialogue with context persistence
- Intent recognition and entity extraction
- Emotion-aware response adaptation
- Typewriter animation with streaming support
- Smart prompt suggestions

### Deep Code Understanding Engine

- Multi-language AST parsing (TypeScript, JavaScript, Python, etc.) via Babel
- Code structure and dependency graph analysis
- Cyclomatic complexity calculation
- Best practice violation detection
- Pattern recognition across codebases

### Intelligent Code Generation

- Context-aware code completion
- Requirement-to-code transformation
- Framework-specific scaffolding (React, Vue, Next.js, etc.)
- Auto-generated test cases
- Documentation generation

### Quality & Security Analysis

- Multi-dimensional quality scoring (readability, maintainability, performance, security)
- Vulnerability detection and severity assessment
- Performance bottleneck identification
- Auto-fix suggestions with one-click application
- Defensive programming pattern enforcement

### Adaptive Learning System

- Personalized learning path generation
- Progress tracking with knowledge graphs
- Difficulty-adaptive content delivery
- Learning analytics and insights
- Skill gap identification

---

## 🌐 AI Model Support

| Provider | Models | Status |
|----------|--------|--------|
| OpenAI | GPT-4, GPT-3.5 Turbo | ✅ Supported |
| Anthropic | Claude 3 | ✅ Supported |
| Google | Gemini Pro | ✅ Supported |
| DeepSeek | DeepSeek Chat | ✅ Supported |
| Baidu | 文心一言 4.0 | ✅ Supported |
| Custom | Configurable via API | ✅ Supported |

---

## 📖 Documentation

| Document | Description |
|----------|-------------|
| [Architecture Overview](docs/ARCHITECTURE.md) | System architecture and design decisions |
| [Development Guide](docs/DEVELOPMENT.md) | Setup, conventions, and workflows |
| [User Guide](docs/USER_GUIDE.md) | Feature usage instructions |
| [API Reference](docs/api/README.md) | AI chat and analysis endpoints |
| [Full Chain Audit Report](docs/FULL_CHAIN_AUDIT_REPORT.md) | Comprehensive project audit |
| [Quick Start Guide](docs/QUICK_START.md) | Get started in 5 minutes |
| [中文文档导航](docs/00-项目总览索引/文档架构导航.md) | 完整中文文档体系 |

---

## 🧪 Development

```bash
# Development server with hot reload
pnpm dev

# Type checking
pnpm build

# Lint
pnpm lint

# Production build & start
pnpm build && pnpm start
```

---

## 🚀 Deployment

### Vercel (Recommended)

1. Fork this repository
2. Import project in [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy

### Docker

```bash
docker build -t yyc3-nexusai .
docker run -p 3000:3000 --env-file .env.local yyc3-nexusai
```

### GitHub Pages

The project is configured for deployment to GitHub Pages with custom domain:

- **Domain**: [nexus-ai.yyc3.top](https://nexus-ai.yyc3.top)
- **DNS**: Configured via CNAME to GitHub Pages
- **SSL**: Automatically provisioned by GitHub

---

## 🤝 Contributing

We welcome contributions! Please follow the [YYC³ Development Standards](docs/03-开发实施阶段/0302-开发规范/).

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit with conventional messages (`git commit -m 'feat: add amazing feature'`)
4. Push to your branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Standards

- TypeScript strict mode with explicit type annotations
- ESLint 9 Flat Config for code quality
- Tailwind CSS 4 utility-first styling
- Component-driven architecture with shadcn/ui
- Comprehensive Props interfaces for all components

---

## 📊 Project Metrics

| Metric | Value |
|--------|-------|
| Component Files | 72 |
| Library Modules | 53 |
| Total Lines of Code | 34,000+ |
| UI Primitives (shadcn/ui) | 14 |
| App Routes | 6 |
| API Endpoints | 1 |
| Documentation Files | 80+ |
| Supported Languages | zh / en |
| Platform Icons | 50+ (iOS/Android/PWA/Web) |

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) — The React Framework for the Web
- [React](https://react.dev/) — The library for web and native user interfaces
- [Tailwind CSS](https://tailwindcss.com/) — A utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) — Beautifully designed components
- [Radix UI](https://www.radix-ui.com/) — Accessible component primitives
- [motion](https://motion.dev/) — Production-ready animations
- [Vercel](https://vercel.com/) — Platform for frontend developers

---

## 📞 Contact

| Channel | Link |
|---------|------|
| Website | [nexus-ai.yyc3.top](https://nexus-ai.yyc3.top) |
| GitHub | [YYC-Cube/YYC3-Nexus-AI](https://github.com/YYC-Cube/YYC3-Nexus-AI) |
| Issues | [GitHub Issues](https://github.com/YYC-Cube/YYC3-Nexus-AI/issues) |
| Email | admin@0379.email |

---

<div align="center">

### YanYuCloudCube™

**言启千行代码 · 语枢万物智能**

*Words inspire thousands of lines of code · Language pivots the intelligence of all things*

---

**YYC³ Team** · Five Highs · Five Standards · Five Transformations

*High Availability · High Performance · High Security · High Scalability · High Intelligence*

Made with ❤️ by [YYC³](https://github.com/YYC-Cube)

</div>
