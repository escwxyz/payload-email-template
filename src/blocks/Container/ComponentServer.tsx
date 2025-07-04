// organize-imports-ignore
import React from 'react'
import { BlockRendererServerProps } from '../../types.js'
import { BlockRendererServer } from '../../components/BlockRenderer/BlockRendererServer.js'
import { Container } from '@react-email/components'

export const ContainerBlockServer = (props: BlockRendererServerProps) => {
  const { block, previewMode } = props

  if (block.blockType !== 'container') {
    return null
  }

  const { content, style } = block

  return (
    <Container style={style}>
      {content && Array.isArray(content) && content.length > 0
        ? content.map((block) => BlockRendererServer({ block, previewMode }))
        : null}
    </Container>
  )
}
