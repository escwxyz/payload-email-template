// organize-imports-ignore
import React from 'react'
import { Heading } from '@react-email/components'
import type { BlockRendererServerProps } from '../../types.js'

export const HeadingBlock = (props: BlockRendererServerProps) => {
  const { block } = props
  if (block.blockType !== 'heading') {
    return null
  }
  const { level, textAlign, style } = block

  const getFontSize = (level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') => {
    switch (level) {
      case 'h1':
        return '2rem'
      case 'h2':
        return '1.5rem'
      case 'h3':
        return '1.25rem'
      case 'h4':
        return '1rem'
      case 'h5':
        return '0.875rem'
      case 'h6':
        return '0.75rem'
      default:
        return '1.5rem'
    }
  }

  return (
    <Heading
      as={block.level}
      style={{
        textAlign: textAlign,
        fontSize: getFontSize(level),
        ...style,
      }}
    >
      {block.content}
    </Heading>
  )
}
