import { Img } from '@react-email/components'
import { APIError } from 'payload'

import type { ImageBlock as ImageBlockType } from '../../types.js'

export const ImageBlock = async ({ block }: { block: ImageBlockType }) => {
  const { image, width, height, objectFit, style } = block

  if (typeof image === 'string' || !image.url || typeof image.url !== 'string') {
    throw new APIError('Image not found', 404)
  }

  return (
    <Img
      src={image.url}
      alt={block.alt}
      width={width || '100%'}
      height={height || 'auto'}
      style={{
        objectFit: objectFit || 'cover',
        ...style,
      }}
    />
  )
}
