// organize-imports-ignore
import React from 'react'
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
  const { columns, style } = block

  return (
    <Row
      style={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      {columns.map((col) => (
        <Column key={col.id}>
          {col.content && Array.isArray(col.content) && col.content.length > 0 ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: col.width ?? '100%',
                alignItems: col.align ?? 'center',
                justifyContent: col.verticalAlign ?? 'center',
                ...col.style,
              }}
            >
              {col.content.map((block) => BlockRenderer({ block, previewMode }))}
            </div>
          ) : null}
        </Column>
      ))}
    </Row>
  )
}
