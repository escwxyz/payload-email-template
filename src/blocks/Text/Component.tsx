// organize-imports-ignore
import React from 'react'
import { Text } from '@react-email/components'
import type {
  BlockRendererServerProps,
  PlainTextBlock,
  LinkBlock as LinkBlockType,
} from '../../types.js'
import { LinkBlock } from '../Link/Component.js'

export const TextBlock = (props: BlockRendererServerProps) => {
  const { block } = props
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
        ? content.map((block: LinkBlockType | PlainTextBlock) => {
            if (block.blockType === 'link') {
              return <LinkBlock key={block.id} block={block} previewMode={props.previewMode} />
            }

            if (block.blockType === 'plainText') {
              return <React.Fragment key={block.id}>{block.content}</React.Fragment>
            }

            return null
          })
        : null}
    </Text>
  )
}
