import { Column, Row } from '@react-email/components'
import type { PreviewMode, RowBlock as RowBlockType } from '../../types.js'
import { BlockRenderer } from '../BlockRenderer.js'

export const RowBlock = ({
  block,
  previewMode,
}: {
  block: RowBlockType
  previewMode: PreviewMode
}) => {
  const { columns } = block

  return (
    <Row>
      {columns.map((col) => (
        <Column key={col.id}>
          {col.content && Array.isArray(col.content) && col.content.length > 0
            ? col.content.map((block) => BlockRenderer({ block, previewMode }))
            : null}
        </Column>
      ))}
    </Row>
  )
}
