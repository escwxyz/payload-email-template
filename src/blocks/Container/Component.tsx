// organize-imports-ignore
import React from 'react'
import { Container } from '@react-email/components'
import type { ContainerBlock as ContainerBlockType, PreviewMode } from '../../types.js'
import { BlockRenderer } from '../BlockRenderer.js'

export const ContainerBlock = ({
  block,
  previewMode,
}: {
  block: ContainerBlockType
  previewMode: PreviewMode
}) => {
  const { content, style } = block

  return (
    <Container style={style}>
      {content && Array.isArray(content) && content.length > 0
        ? content.map((block) => BlockRenderer({ block, previewMode }))
        : null}
    </Container>
  )
}
