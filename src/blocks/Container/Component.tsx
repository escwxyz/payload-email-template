import { Container } from '@react-email/components'
import type { ContainerBlock as ContainerBlockType } from '../../types.js'
import { BlockRenderer } from '../BlockRenderer.js'

export const ContainerBlock = ({ block }: { block: ContainerBlockType }) => {
  const { content, style } = block

  return <Container style={style}>{content.map((block) => BlockRenderer({ block }))}</Container>
}
