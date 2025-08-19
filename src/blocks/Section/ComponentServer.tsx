// organize-imports-ignore
import React from 'react'
import type { BlockRendererServerProps } from '../../types.js'
import { Section } from '@react-email/components'
import type { Block } from '../../types.js'
import { BlockRendererServer } from '../../components/BlockRenderer/BlockRendererServer.js'

export const SectionBlockServer = (
  props: BlockRendererServerProps & { macroContext?: Record<string, any> },
) => {
  const { block, previewMode, macroContext } = props

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
              <BlockRendererServer
                block={block}
                previewMode={previewMode}
                macroContext={macroContext}
              />
            </React.Fragment>
          ))
        : null}
    </Section>
  )
}
