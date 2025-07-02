import type { Payload } from 'payload'

import { getPayload } from 'payload'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { seedEmailTemplates } from '../dev/helpers/seedEmailTemplates.js'
import config from '../dev/payload.config.js'

let payload: Payload

afterAll(async () => {
  await payload.destroy()
})

beforeAll(async () => {
  payload = await getPayload({ config })
})

describe('Plugin integration tests', () => {
  it('should seed email templates', async () => {
    const emailTemplate = await seedEmailTemplates(payload)
    expect(emailTemplate).toBeDefined()
  })
  // TODO
  // test('should query custom endpoint added by plugin', async () => {
  //   const request = new Request('http://localhost:3000/api/email-templates/preview', {
  //     method: 'GET',
  //   })
  //   const payloadRequest = await createPayloadRequest({ config, request })
  //   const response = await previewEmailTemplate(payloadRequest)
  //   expect(response.status).toBe(200)
  //   const data = await response.json()
  //   expect(data).toMatchObject({
  //     message: 'Hello from custom endpoint',
  //   })
  // })
  // test('plugin creates and seeds plugin-collection', async () => {
  //   expect(payload.collections['plugin-collection']).toBeDefined()
  //   const { docs } = await payload.find({ collection: 'plugin-collection' })
  //   expect(docs).toHaveLength(1)
  // })
})
