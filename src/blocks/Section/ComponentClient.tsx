'use client'

// organize-imports-ignore
import React from 'react'
import { BlockRendererClient } from '../../components/BlockRenderer/BlockRendererClient.js'
import type { BlockRendererClientProps } from '../../types.js'
import { Section } from '@react-email/components'
import type { Block } from '../../types.js'

export const SectionBlockClient = (
  props: BlockRendererClientProps & { macroContext?: Record<string, any> },
) => {
  const { block, previewMode, imageCollectionSlug, macroContext } = props

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
              <BlockRendererClient
                block={block}
                previewMode={previewMode}
                imageCollectionSlug={imageCollectionSlug}
                macroContext={macroContext}
              />
            </React.Fragment>
          ))
        : null}
    </Section>
  )
}
