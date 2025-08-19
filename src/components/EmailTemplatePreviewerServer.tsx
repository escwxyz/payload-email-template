// organize-imports-ignore
import React from 'react'
import type { PluginOptions } from '../types.js'
import { EmailTemplatePreviewerClient } from './EmailTemplatePreviewerClient.js'

export const EmailTemplatePreviewerServer = (options: PluginOptions) => {
  return (
    <EmailTemplatePreviewerClient
      config={{
        previewBreakpoints: options?.previewBreakpoints,
        imageCollectionSlug: options?.imageCollectionSlug,
        macros: options?.macros
          ? {
              variables: options.macros.variables,
              config: options.macros.config,
              // Functions cannot be serialized to client components
              functions: undefined,
            }
          : undefined,
      }}
    />
  )
}
