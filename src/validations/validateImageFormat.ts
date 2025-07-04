import type { UploadFieldSingleValidation } from 'payload'
import { getPluginConfig } from '../store.js'

export const validateImageFormat: UploadFieldSingleValidation = async (
  value,
  { req: { payload } },
) => {
  if (!value) {
    return true
  }

  const imageCollectionSlug = getPluginConfig()?.imageCollectionSlug || 'media'

  let id = value
  if (typeof value === 'object' && value !== null) {
    if ('id' in value && (typeof value.id === 'string' || typeof value.id === 'number')) {
      id = value.id
    }
  }

  if (typeof id !== 'string' && typeof id !== 'number') {
    return 'Invalid image reference'
  }

  const image = await payload.findByID({
    collection: imageCollectionSlug,
    id,
  })

  if (!image) {
    return 'Image not found'
  }

  const { mimeType, filename } = image

  if (
    (mimeType && mimeType.toLowerCase().includes('svg')) ||
    (filename && filename.toLowerCase().endsWith('.svg'))
  ) {
    return 'SVG images are not supported'
  }

  if (!mimeType?.toLowerCase().startsWith('image/')) {
    return 'Image must be a valid image format'
  }

  return true
}
