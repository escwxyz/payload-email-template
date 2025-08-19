'use client'

// organize-imports-ignore
import React from 'react'
import { BlockRendererClient } from '../../components/BlockRenderer/BlockRendererClient.js'
import { BlockRendererClientProps } from '../../types.js'
import { Column, Row } from '@react-email/components'

export const RowBlockClient = (props: BlockRendererClientProps & { macroContext?: Record<string, any> }) => {
  const { block, previewMode, imageCollectionSlug, macroContext } = props

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
              {col.content.map((block) => (
                <React.Fragment key={block.id}>
                  <BlockRendererClient
                    block={block}
                    previewMode={previewMode}
                    imageCollectionSlug={imageCollectionSlug}
                    macroContext={macroContext}
                  />
                </React.Fragment>
              ))}
            </div>
          ) : null}
        </Column>
      ))}
    </Row>
  )
}
