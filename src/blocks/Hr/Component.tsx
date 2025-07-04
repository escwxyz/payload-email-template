// organize-imports-ignore
import React from 'react'
import { Hr } from '@react-email/components'
import type { BlockRendererServerProps } from '../../types.js'

export const HrBlock = (props: BlockRendererServerProps) => {
  const { block } = props
  if (block.blockType !== 'hr') {
    return null
  }
  const { color, thickness, margin, style } = block

  return <Hr style={{ borderColor: color, borderWidth: thickness, margin, ...style }} />
}
