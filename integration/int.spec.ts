import type { Payload } from 'payload'

import { createPayloadRequest, getPayload } from 'payload'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import type { EmailTemplate } from '../dev/payload-types.js'
import config from '../dev/payload.config.js'
import { generate } from '../src/endpoints/generate.js'

let payload: Payload

let demoEmailTemplate: EmailTemplate | undefined

afterAll(async () => {
  await payload.destroy()
})

beforeAll(async () => {
  payload = await getPayload({ config })

  const emailTemplate = await payload.find({
    collection: 'email-templates',
    where: {
      name: {
        equals: 'Demo Email Template',
      },
    },
    limit: 1,
  })

  demoEmailTemplate = emailTemplate.docs[0]

  console.log('Demo email template:', demoEmailTemplate?.id)
})

describe('Plugin integration tests', () => {
  it('should seed email templates', async () => {
    expect(demoEmailTemplate).toBeDefined()
  })

  describe('email template', () => {
    it('should have name', () => {
      expect(demoEmailTemplate?.name).toBe('Demo Email Template')
    })
  })

  describe('generate endpoint', () => {
    it('should error with non-POST request', async () => {
      const endpoint = `http://localhost:3000/api/email-templates/${demoEmailTemplate!.id}/generate`
      const request = new Request(endpoint, { method: 'GET' })
      const payloadRequest = await createPayloadRequest({ config, request })
      payloadRequest.routeParams = { id: demoEmailTemplate!.id }
      const response = await generate(payloadRequest)
      expect(response.status).toBe(405)
    })

    it('should get access denied by default when endpoint is not public', async () => {
      const endpoint = `http://localhost:3000/api/email-templates/${demoEmailTemplate!.id}/generate`
      const request = new Request(endpoint, { method: 'POST' })
      const payloadRequest = await createPayloadRequest({ config, request })
      payloadRequest.routeParams = { id: demoEmailTemplate!.id }
      const response = await generate(payloadRequest)
      expect(response.status).toBe(403)
      const data = await response.json()
      expect(data).toMatchObject({ error: 'Forbidden' })
    })

    it('should generate email template when access is skipped', async () => {
      const endpoint = `http://localhost:3000/api/email-templates/${demoEmailTemplate!.id}/generate`
      const request = new Request(endpoint, { method: 'POST' })
      const payloadRequest = await createPayloadRequest({ config, request })
      payloadRequest.routeParams = { id: demoEmailTemplate!.id }
      payloadRequest.context.skipAccess = true
      const response = await generate(payloadRequest)
      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data).toMatchObject({
        html: expect.any(String),
        plainText: expect.any(String),
      })
    })
  })
})
