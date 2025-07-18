'use client'
// organize-imports-ignore
import React from 'react'
import { BlockRendererClientProps } from '../../types.js'
import { BlockRendererClient } from '../../components/BlockRenderer/BlockRendererClient.js'
import { Container } from '@react-email/components'

export const ContainerBlockClient = (props: BlockRendererClientProps) => {
  const { block, previewMode, imageCollectionSlug } = props

  if (block.blockType !== 'container') {
    return null
  }

  const { content, style } = block

  return (
    <Container style={style}>
      {content && Array.isArray(content) && content.length > 0
        ? content.map((block) => (
            <React.Fragment key={block.id}>
              <BlockRendererClient
                block={block}
                previewMode={previewMode}
                imageCollectionSlug={imageCollectionSlug}
              />
            </React.Fragment>
          ))
        : null}
    </Container>
  )
}
