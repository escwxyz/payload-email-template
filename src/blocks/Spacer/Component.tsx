// organize-imports-ignore
import React from 'react'
import type { BlockRendererServerProps } from '../../types.js'

export const SpacerBlock = (props: BlockRendererServerProps) => {
  const { block } = props
  if (block.blockType !== 'spacer') {
    return null
  }
  const { height } = block
  return <div style={{ height: height || '16px' }} />
}
