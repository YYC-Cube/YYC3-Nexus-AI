import nextConfig from "eslint-config-next"

const config = [...nextConfig]

const overrides = {
  "import/no-anonymous-default-export": "off",
  "react-hooks/immutability": "off",
  "react-hooks/set-state-in-effect": "off",
  "react-hooks/purity": "off",
  "react-hooks/no-unnecessary-hook-call": "off",
}

config.forEach((rule) => {
  if (rule && rule.rules) {
    Object.assign(rule.rules, overrides)
  }
})

export default config
