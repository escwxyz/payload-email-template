import React from 'react'
import type { BlockRendererServerProps, MacroBlock } from '../../types.js'
import { processMacro } from '../../utils/macro-processor.js'

export const MacroComponentServer: React.FC<
  BlockRendererServerProps & { macroContext?: Record<string, any> }
> = (props) => {
  const { block, macroContext = {} } = props

  if (block.blockType !== 'macro') {
    return null
  }

  const data = block as MacroBlock
  const processedContent = processMacro(data, macroContext)

  if (processedContent === null || processedContent === undefined) {
    return null
  }

  if (React.isValidElement(processedContent)) {
    return processedContent
  }

  return <>{processedContent}</>
}
