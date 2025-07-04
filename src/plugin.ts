import type { Access, Config } from 'payload'

import { ImageBlock } from './blocks/Image/config.js'
import { createEmailTemplatesCollection } from './collections/EmailTemplates.js'
import { createStyleField } from './fields/style.js'
import { setPluginConfig } from './store.js'
import type { PluginOptions } from './types.js'
import { validateImageFormat } from './validations/validateImageFormat.js'

export const emailTemplatePlugin =
  (pluginOptions: PluginOptions) =>
  (config: Config): Config => {
    if (!config.collections) {
      config.collections = []
    }

    const imageCollectionSlug = pluginOptions.imageCollectionSlug || 'media'
    const disableStyle =
      pluginOptions.disableStyle === undefined ? false : pluginOptions.disableStyle
    const isLocalizationEnabled = !!config.localization

    const endpointAccess: Access = pluginOptions.endpointAccess || (({ req }) => Boolean(req.user))

    const previewBreakpoints = pluginOptions.previewBreakpoints || [
      {
        name: 'mobile',
        label: 'Mobile',
        width: 375,
        height: 667,
      },
      {
        name: 'desktop',
        label: 'Desktop',
        width: 1440,
        height: 900,
      },
    ]

    ImageBlock.fields.unshift({
      name: 'alt',
      label: 'Alt Text',
      type: 'text',
      localized: isLocalizationEnabled,
    })

    ImageBlock.fields.unshift({
      name: 'image',
      type: 'upload',
      relationTo: imageCollectionSlug,
      label: 'Image',
      admin: {
        description: 'The image to display in the email template.',
      },
      validate: validateImageFormat,
    })

    ImageBlock.fields.push(createStyleField())

    setPluginConfig({
      ...pluginOptions,
      endpointAccess,
      previewBreakpoints,
      imageCollectionSlug,
      disableStyle,
      isLocalizationEnabled: !!config.localization,
    })

    const emailTemplates = createEmailTemplatesCollection({
      ...pluginOptions,
      endpointAccess,
      previewBreakpoints,
      imageCollectionSlug,
      disableStyle,
      isLocalizationEnabled: !!config.localization,
    })

    config.collections.push(emailTemplates)

    if (pluginOptions.disabled) {
      return config
    }

    if (!config.endpoints) {
      config.endpoints = []
    }

    if (!config.admin) {
      config.admin = {}
    }

    if (!config.admin.components) {
      config.admin.components = {}
    }

    if (!config.admin.components.beforeDashboard) {
      config.admin.components.beforeDashboard = []
    }

    const incomingOnInit = config.onInit

    config.onInit = async (payload) => {
      if (incomingOnInit) {
        await incomingOnInit(payload)
      }
    }

    return config
  }
