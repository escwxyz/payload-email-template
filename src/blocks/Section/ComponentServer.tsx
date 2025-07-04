// organize-imports-ignore
import React from 'react'
import { BlockRendererServerProps } from '../../types.js'
import { Section } from '@react-email/components'
import type { Block } from '../../types.js'
import { BlockRendererServer } from '../../components/BlockRenderer/BlockRendererServer.js'

export const SectionBlockServer = (props: BlockRendererServerProps) => {
  const { block, previewMode } = props

  if (block.blockType !== 'section') {
    return null
  }

  const { content, backgroundColor, padding, style } = block

  const mergedStyle = {
    ...(backgroundColor ? { backgroundColor: backgroundColor } : {}),
    ...(padding ? { padding: padding } : {}),
    ...style,
  }

  return (
    <Section style={mergedStyle}>
      {content && Array.isArray(content) && content.length > 0
        ? content.map((block: Block) => (
            <React.Fragment key={block.id}>
              <BlockRendererServer block={block} previewMode={previewMode} />
            </React.Fragment>
          ))
        : null}
    </Section>
  )
}
