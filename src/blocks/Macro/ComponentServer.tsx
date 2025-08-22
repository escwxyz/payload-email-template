import React from 'react'
import { BlockRendererServer } from '../../components/BlockRenderer/BlockRendererServer.js'
import type { Block, BlockRendererServerProps, MacroBlock } from '../../types.js'
import { processMacro } from '../../utils/macro-processor.js'

export const MacroComponentServer: React.FC<
  BlockRendererServerProps & { macroContext?: Record<string, unknown> }
> = (props) => {
  const { block, macroContext = {}, previewMode } = props

  if (block.blockType !== 'macro') {
    return null
  }

  const data = block as MacroBlock

  const renderBlocks = (blocks: Block[], context?: Record<string, unknown>) => {
    return blocks.map((childBlock) => (
      <React.Fragment key={childBlock.id}>
        <BlockRendererServer
          block={childBlock}
          previewMode={previewMode}
          macroContext={context || macroContext}
        />
      </React.Fragment>
    ))
  }

  const processedContent = processMacro(data, macroContext, renderBlocks)

  if (processedContent === null || processedContent === undefined) {
    return null
  }

  if (React.isValidElement(processedContent)) {
    return processedContent
  }

  return <>{processedContent}</>
}
