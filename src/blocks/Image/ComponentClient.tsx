'use client'
// organize-imports-ignore
import React from 'react'
import { usePayloadAPI } from '@payloadcms/ui'
import { Img } from '@react-email/components'
import type { BlockRendererClientProps, ImageBlock as ImageBlockType } from '../../types.js'

export const ImageBlockClient = (props: BlockRendererClientProps) => {
  const { block, imageCollectionSlug } = props

  const [{ data, isError, isLoading }] = usePayloadAPI(
    block.blockType === 'image' ? `/api/${imageCollectionSlug}/${block.image}` : '',
  )

  if (block.blockType !== 'image') {
    return null
  }

  const { width, height, objectFit, style } = block as ImageBlockType

  const imageUrl = data?.url

  const isRemote = /^https?:\/\//.test(imageUrl || '')

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
