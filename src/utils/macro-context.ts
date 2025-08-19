import { getPluginConfig } from '../store.js'

export function getMacroContext(runtimeContext: Record<string, any> = {}): Record<string, any> {
  const pluginConfig = getPluginConfig()
  const pluginMacros = pluginConfig?.macros || {}

  // Merge plugin configuration with runtime context
  // Runtime context takes precedence over plugin configuration
  return {
    variables: {
      ...pluginMacros.variables,
      ...runtimeContext.variables,
    },
    functions: {
      ...pluginMacros.functions,
      ...runtimeContext.functions,
    },
    config: {
      ...pluginMacros.config,
      ...runtimeContext.config,
    },
    // Include any other context properties
    ...runtimeContext,
  }
}
