'use client'

import { usePayloadAPI } from '@payloadcms/ui'
import { Img } from '@react-email/components'
import type { UploadCollectionSlug } from 'payload'
import type { ImageBlock as ImageBlockType } from '../../types.js'

export const ImageBlockClient = ({
  block,
  imageCollectionSlug,
}: {
  block: ImageBlockType
  imageCollectionSlug: UploadCollectionSlug
}) => {
  const { image, width, height, objectFit, style } = block

  console.log('image', image)

  console.log('endpoint', `/api/${imageCollectionSlug}/${image}`)

  const [{ data, isError, isLoading }] = usePayloadAPI(`/api/${imageCollectionSlug}/${image}`)

  console.log('data', data)

  console.log('isError', isError)
  console.log('isLoading', isLoading)

  const imageUrl = data?.url

  const isRemote = /^https?:\/\//.test(imageUrl || '')

  console.log('imageUrl', imageUrl)

  const src = isRemote ? imageUrl || '' : `${window.location.origin}${imageUrl || ''}`

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error occurred while loading image.</p>

  return (
    <Img
      src={src}
      alt={block.alt}
      width={width || '100%'}
      height={height || 'auto'}
      style={{
        objectFit: objectFit || 'cover',
        borderRadius: '10px',
        ...style,
      }}
    />
  )
}
