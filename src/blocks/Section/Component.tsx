// organize-imports-ignore
import React from 'react'
import { Section } from '@react-email/components'
import type { Block, PreviewMode, SectionBlock as SectionBlockType } from '../../types.js'
import { BlockRenderer } from '../BlockRenderer.js'

export const SectionBlock = ({
  block,
  previewMode,
}: {
  block: SectionBlockType
  previewMode: PreviewMode
}) => {
  const { content, backgroundColor, padding, style } = block

  const mergedStyle = {
    ...(backgroundColor ? { backgroundColor: backgroundColor } : {}),
    ...(padding ? { padding: padding } : {}),
    ...style,
  }

  return (
    <Section style={mergedStyle}>
      {content && Array.isArray(content) && content.length > 0
        ? content.map((block: Block) => BlockRenderer({ block, previewMode }))
        : null}
    </Section>
  )
}
