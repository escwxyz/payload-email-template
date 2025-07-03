// organize-imports-ignore
import React from 'react'
import { Link } from '@react-email/components'
import type { LinkBlock as LinkBlockType } from '../../types.js'
import { injectMacro } from '../../utils/injectMacro.js'
import { getPluginConfig } from '../../store.js'

export const LinkBlock = ({ block }: { block: LinkBlockType }) => {
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
      {injectMacro(text, getPluginConfig()?.macros)}
    </Link>
  )
}
