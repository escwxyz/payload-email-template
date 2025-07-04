// organize-imports-ignore
import React from 'react'
import { Link } from '@react-email/components'
import type { BlockRendererServerProps } from '../../types.js'

export const LinkBlock = (props: BlockRendererServerProps) => {
  const { block } = props
  if (block.blockType !== 'link') {
    return null
  }
  const { url, target, text, color, underline, style } = block

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
