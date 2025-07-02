import { Section } from '@react-email/components'
import type { Block, SectionBlock as SectionBlockType } from '../../types.js'
import { BlockRenderer } from '../BlockRenderer.js'

export const SectionBlock = ({ block }: { block: SectionBlockType }) => {
  const { content, backgroundColor, padding, style } = block

  const mergedStyle = {
    ...(backgroundColor ? { backgroundColor: backgroundColor } : {}),
    ...(padding ? { padding: padding } : {}),
    ...style,
  }

  return (
    <Section style={mergedStyle}>{content.map((block: Block) => BlockRenderer({ block }))}</Section>
  )
}
