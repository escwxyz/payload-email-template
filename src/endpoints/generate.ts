import { APIError, PayloadHandler } from 'payload'
import { getPluginConfig } from '../store.js'
import { renderEmailTemplate } from '../utils/renderEmailTempalte.js'

export const generate: PayloadHandler = async (req) => {
  if (req.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 })
  }

  if (!Boolean(req.context.skipAccess)) {
    const access = getPluginConfig()?.endpointAccess

    if (typeof access === 'function') {
      const allowed = await access({ req })
      if (!allowed) return Response.json({ error: 'Forbidden' }, { status: 403 })
    } else if (access === false) {
      return Response.json({ error: 'Forbidden' }, { status: 403 })
    } else if (!req.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  try {
    const id = req.routeParams?.id

    if (!id || typeof id !== 'string') {
      return Response.json({ error: 'Unable to find email template' }, { status: 400 })
    }

    const data = await req.payload.findByID({
      collection: 'email-templates',
      id,
      locale: req.locale,
    })

    if (!data) {
      return Response.json({ error: 'Email template not found' }, { status: 404 })
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

    return Response.json({
      html,
      plainText,
    })
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('Error generating email template:', error)
    }

    if (error instanceof APIError) {
      return Response.json({ error: error.message }, { status: error.status || 400 })
    }

    if (error instanceof Error) {
      if (error.message.includes('not found')) {
        return Response.json({ error: error.message }, { status: 404 })
      }
      if (error.message.includes('Unauthorized')) {
        return Response.json({ error: error.message }, { status: 401 })
      }
      if (error.message.includes('Forbidden')) {
        return Response.json({ error: error.message }, { status: 403 })
      }
      if (
        error.message.includes('bad request') ||
        error.message.includes('Unable to find email template')
      ) {
        return Response.json({ error: error.message }, { status: 400 })
      }
    }
    return Response.json(
      {
        error: `Error generating email template: ${error instanceof Error ? error.message : 'Unknown error'}`,
      },
      { status: 500 },
    )
  }
}
