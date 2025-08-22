import { pretty, render } from '@react-email/render'
import React from 'react'
import { EmailTemplateServer } from '../components/EmailTemplateServer.js'
import { getMacroContext } from './macro-context.js'
import { injectMacros } from './macro-processor.js'

export type RenderEmailTemplateProps = {
  data: Record<string, unknown>
  locale?: string | null
  format?: 'html' | 'plainText'
  macroContext?: Record<string, unknown>
}

export const renderEmailTemplate = async ({
  data,
  locale,
  format,
  macroContext = {},
}: RenderEmailTemplateProps) => {
  // Merge plugin configuration with runtime macro context
  const mergedMacroContext = getMacroContext(macroContext)

  const element = React.createElement(EmailTemplateServer, {
    data,
    locale,
    macroContext: mergedMacroContext,
  })

  const html = await render(element, { plainText: format === 'plainText' })

  return format === 'plainText' ? injectMacros(html, mergedMacroContext) : await pretty(html)
}
