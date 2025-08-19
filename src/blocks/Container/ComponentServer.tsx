// organize-imports-ignore
import React from 'react'
import { BlockRendererServerProps } from '../../types.js'
import { BlockRendererServer } from '../../components/BlockRenderer/BlockRendererServer.js'
import { Container } from '@react-email/components'

export const ContainerBlockServer = (
  props: BlockRendererServerProps & { macroContext?: Record<string, any> },
) => {
  const { block, previewMode, macroContext } = props

  if (block.blockType !== 'container') {
    return null
  }

  const { content, style } = block

  return (
    <Container style={style}>
      {content && Array.isArray(content) && content.length > 0
        ? content.map((block) => (
            <React.Fragment key={block.id}>
              <BlockRendererServer
                block={block}
                previewMode={previewMode}
                macroContext={macroContext}
              />
            </React.Fragment>
          ))
        : null}
    </Container>
  )
}
