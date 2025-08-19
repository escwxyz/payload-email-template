// organize-imports-ignore
import React from 'react'
import { Heading } from '@react-email/components'
import type { 
  BlockRendererServerProps, 
  PlainTextBlock, 
  LinkBlock as LinkBlockType, 
  MacroBlock 
} from '../../types.js'
import { LinkBlock } from '../Link/Component.js'
import { MacroComponentServer } from '../Macro/ComponentServer.js'
import { injectMacros } from '../../utils/macro-processor.js'

export const HeadingBlockServer = (props: BlockRendererServerProps & { macroContext?: Record<string, any> }) => {
  const { block, macroContext = {} } = props
  if (block.blockType !== 'heading') {
    return null
  }
  const { level, textAlign, style, content } = block

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
      as={level}
      style={{
        textAlign: textAlign,
        fontSize: getFontSize(level),
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
    </Heading>
  )
}