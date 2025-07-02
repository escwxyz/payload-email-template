import type { PluginOptions } from './types.js'

let pluginConfig:
  | (PluginOptions & {
      isLocalizationEnabled: boolean
    })
  | undefined

export function setPluginConfig(config: PluginOptions & { isLocalizationEnabled: boolean }) {
  pluginConfig = config
}

export function getPluginConfig():
  | (PluginOptions & { isLocalizationEnabled: boolean })
  | undefined {
  return pluginConfig
}
