import { Text } from '@react-email/components'
import type { TextBlock as TextBlockType } from '../../types.js'

export const TextBlock = ({ block }: { block: TextBlockType }) => {
  return (
    <Text
      style={{
        fontSize: block.fontSize,
        textAlign: block.textAlign,
        lineHeight: block.lineHeight,
        ...block.style,
      }}
    >
      {block.text}
    </Text>
  )
}
