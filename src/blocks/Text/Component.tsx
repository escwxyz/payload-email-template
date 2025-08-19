// organize-imports-ignore
import React from 'react'
import { Text } from '@react-email/components'
import type {
  BlockRendererServerProps,
  PlainTextBlock,
  LinkBlock as LinkBlockType,
  MacroBlock,
} from '../../types.js'
import { LinkBlock } from '../Link/Component.js'
import { MacroComponentServer } from '../Macro/ComponentServer.js'
import { injectMacros } from '../../utils/macro-processor.js'

export const TextBlock = (
  props: BlockRendererServerProps & { macroContext?: Record<string, any> },
) => {
  const { block, macroContext = {} } = props
  if (block.blockType !== 'text') {
    return null
  }
  const { content, color, style, fontSize, textAlign, lineHeight } = block
  return (
    <Text
      style={{
        whiteSpace: 'pre-line',
        fontSize: fontSize,
        textAlign: textAlign,
        lineHeight: lineHeight,
        color: color ?? undefined,
        ...style,
      }}
    >
      {content && Array.isArray(content) && content.length > 0
        ? content.map((block: LinkBlockType | PlainTextBlock | MacroBlock) => {
            if (block.blockType === 'link') {
              return <LinkBlock key={block.id} block={block} previewMode={props.previewMode} />
            }

            if (block.blockType === 'plainText') {
              const processedContent = injectMacros(block.content, macroContext)
              return <React.Fragment key={block.id}>{processedContent}</React.Fragment>
            }

            if (block.blockType === 'macro') {
              return (
                <MacroComponentServer
                  key={block.id}
                  block={block}
                  previewMode={props.previewMode}
                  macroContext={macroContext}
                />
              )
            }

            return null
          })
        : null}
    </Text>
  )
}
