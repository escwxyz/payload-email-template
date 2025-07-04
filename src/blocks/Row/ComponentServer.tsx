// organize-imports-ignore
import React from 'react'
import { BlockRendererServerProps } from '../../types.js'
import { Column, Row } from '@react-email/components'
import { BlockRendererServer } from '../../components/BlockRendererFactory.js'

export const RowBlockServer = (props: BlockRendererServerProps) => {
  const { block, previewMode } = props

  if (block.blockType !== 'row') {
    return null
  }

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
              {col.content.map((block) =>
                BlockRendererServer({
                  block,
                  previewMode,
                }),
              )}
            </div>
          ) : null}
        </Column>
      ))}
    </Row>
  )
}
