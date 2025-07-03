import { render } from '@react-email/render'
import React from 'react'
import { EmailTemplate } from '../blocks/EmailTemplate.js'
import { getPluginConfig } from '../store.js'
import { injectMacro } from './injectMacro.js'

export type RenderEmailTemplateProps = {
  data: Record<string, any>
  locale?: string | null
  format?: 'html' | 'plainText'
}

export const renderEmailTemplate = async ({
  data,
  locale = 'en',
  format,
}: RenderEmailTemplateProps) => {
  const element = React.createElement(EmailTemplate, {
    data,
    locale,
    previewMode: 'render',
  })

  const html = await render(element, { plainText: format === 'plainText' })

  const pluginConfig = getPluginConfig()

  const macros = pluginConfig?.macros || {}

  const injectedHtml = injectMacro(html, macros)

  return injectedHtml
}
