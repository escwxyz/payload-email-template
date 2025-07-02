import { Heading } from '@react-email/components'
import type { HeadingBlock as HeadingBlockType } from '../../types.js'

export const HeadingBlock = ({ block }: { block: HeadingBlockType }) => {
  return (
    <Heading
      as={block.level}
      style={{
        textAlign: block.textAlign,
        ...block.style,
      }}
    >
      {block.content}
    </Heading>
  )
}
