import { getPluginConfig } from '../store.js'
import { EmailTemplatePreviewerClient } from './EmailTemplatePreviewerClient.js'

export const EmailTemplatePreviewerServer = () => {
  const config = getPluginConfig()
  return (
    <EmailTemplatePreviewerClient
      config={{
        macros: config?.macros,
        previewBreakpoints: config?.previewBreakpoints,
      }}
    />
  )
}
