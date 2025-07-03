// organize-imports-ignore
import React from 'react'
import { Heading } from '@react-email/components'
import type { HeadingBlock as HeadingBlockType } from '../../types.js'
import { getPluginConfig } from '../../store.js'
import { injectMacro } from '../../utils/injectMacro.js'

export const HeadingBlock = ({ block }: { block: HeadingBlockType }) => {
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
      {injectMacro(block.content, getPluginConfig()?.macros)}
    </Heading>
  )
}
