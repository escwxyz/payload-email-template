import { Column, Row } from '@react-email/components'
import type { RowBlock as RowBlockType } from '../../types.js'
import { BlockRenderer } from '../BlockRenderer.js'

export const RowBlock = ({ block }: { block: RowBlockType }) => {
  const { columns } = block

  return (
    <Row>
      {columns.map((col) => (
        <Column key={col.id}>{col.content.map((block) => BlockRenderer({ block }))}</Column>
      ))}
    </Row>
  )
}
