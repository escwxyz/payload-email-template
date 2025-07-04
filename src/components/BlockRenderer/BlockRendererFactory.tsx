// organize-imports-ignore
import React from 'react'
import type { EnvBlocksMap } from '../../types.js'

export function createBlockRenderer(envBlocks: EnvBlocksMap) {
  return function BlockRenderer(props: any) {
    const { block } = props
    const BlockComponent = envBlocks[block.blockType as keyof EnvBlocksMap]
    if (!BlockComponent) return <div>Unknown block type</div>
    return <BlockComponent key={block.id} {...props} />
  }
}
