// organize-imports-ignore
import React from 'react'
import { Link } from '@react-email/components'
import type { BlockRendererServerProps } from '../../types.js'
import { injectMacros } from '../../utils/macro-processor.js'

export const LinkBlock = (props: BlockRendererServerProps) => {
  const { block, macroContext } = props
  if (block.blockType !== 'link') {
    return null
  }
  const { url: rawUrl, target, text: rawText, color, underline, style } = block

  const url = injectMacros(rawUrl, macroContext)
  const text = injectMacros(rawText, macroContext)

  return (
    <Link
      href={url}
      target={target}
      style={{
        ...(color ? { color } : {}),
        textDecoration: underline ? 'underline' : 'none',
        ...style,
      }}
    >
      {text}
    </Link>
  )
}
