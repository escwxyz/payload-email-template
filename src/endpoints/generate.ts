import { APIError, PayloadHandler } from 'payload'
import { getPluginConfig } from '../store.js'
import { injectMacro } from '../utils/injectMacro.js'
import { renderEmailTemplate } from '../utils/renderEmailTempalte.js'

export const generate: PayloadHandler = async (req) => {
  if (req.method !== 'POST') {
    throw new APIError('Method not allowed', 405)
  }

  const access = getPluginConfig()?.endpointAccess

  if (typeof access === 'function') {
    const allowed = await access({ req })
    if (!allowed) throw new APIError('Forbidden', 403)
  } else if (access === false) {
    throw new APIError('Forbidden', 403)
  } else if (!req.user) {
    throw new APIError('Unauthorized', 401)
  }

  try {
    const id = req.routeParams?.id

    if (!id || typeof id !== 'string') {
      throw new APIError('Unable to find email template', 400)
    }

    const data = await req.payload.findByID({
      collection: 'email-templates',
      id,
      locale: req.locale,
    })

    if (!data) {
      throw new APIError('Unable to find email template', 400)
    }

    const [html, plainText] = await Promise.all([
      renderEmailTemplate({
        data,
        locale: req.locale,
        format: 'html',
      }),
      renderEmailTemplate({
        data,
        locale: req.locale,
        format: 'plainText',
      }),
    ])

    const macros = getPluginConfig()?.macros

    const finalHtml = injectMacro(html, macros)

    const finalPlainText = injectMacro(plainText, macros)

    return Response.json({
      html: finalHtml,
      plainText: finalPlainText,
    })
  } catch (error) {
    throw new APIError(
      `Error generating email template: ${error instanceof Error ? error.message : 'Unknown error'}`,
      500,
    )
  }
}
