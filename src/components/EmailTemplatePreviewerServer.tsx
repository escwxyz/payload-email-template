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
      }}
    />
  )
}
