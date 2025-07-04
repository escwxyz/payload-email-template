import { pretty, render } from '@react-email/render'
import React from 'react'
import { EmailTemplateServer } from '../components/EmailTemplateServer.js'
import { injectMacro } from './injectMacro.js'

export type RenderEmailTemplateProps = {
  data: Record<string, any>
  locale?: string | null
  format?: 'html' | 'plainText'
}

export const renderEmailTemplate = async ({ data, locale, format }: RenderEmailTemplateProps) => {
  const element = React.createElement(EmailTemplateServer, {
    data,
    locale,
  })

  const html = await render(element, { plainText: format === 'plainText' })

  const injectedHtml = injectMacro(html, {}) // TODO: support macros

  return format === 'plainText' ? injectedHtml : await pretty(injectedHtml)
}
