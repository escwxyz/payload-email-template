// organize-imports-ignore
import React from 'react'
import { Text } from '@react-email/components'
import type {
  LinkBlock as LinkBlockType,
  PlainTextBlock as PlainTextBlockType,
  TextBlock as TextBlockType,
} from '../../types.js'
import { LinkBlock } from '../Link/Component.js'
import { injectMacro } from '../../utils/injectMacro.js'
import { getPluginConfig } from '../../store.js'

export const TextBlock = ({ block }: { block: TextBlockType }) => {
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
        ? content.map((block: LinkBlockType | PlainTextBlockType) => {
            if (block.blockType === 'link') {
              return <LinkBlock key={block.id} block={block} />
            }

            if (block.blockType === 'plainText') {
              return (
                <React.Fragment key={block.id}>
                  {injectMacro(block.content, getPluginConfig()?.macros)}
                </React.Fragment>
              )
            }

            return null
          })
        : null}
    </Text>
  )
}
