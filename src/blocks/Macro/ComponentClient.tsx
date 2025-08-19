'use client'

import React from 'react'
import type { BlockRendererClientProps, MacroBlock } from '../../types.js'
import { processMacro } from '../../utils/macro-processor.js'
import { getMacroContext } from '../../utils/macro-context.js'

export const MacroComponentClient: React.FC<BlockRendererClientProps & { macroContext?: Record<string, any> }> = (props) => {
  const { block, macroContext = {} } = props
  
  if (block.blockType !== 'macro') {
    return null
  }
  
  const data = block as MacroBlock
  
  // Try to process the macro content for preview
  const mergedContext = getMacroContext(macroContext)
  const processedContent = processMacro(data, mergedContext)
  
  // If we got actual content, display it
  if (processedContent !== null && processedContent !== undefined) {
    if (React.isValidElement(processedContent)) {
      return processedContent
    }
    return <>{processedContent}</>
  }
  
  // Fallback to expression preview if processing fails
  const renderPreview = () => {
    switch (data.type) {
      case 'variable':
        return (
          <div className="macro-preview">
            <span className="macro-type">Variable:</span>
            <code>{`{{${data.variable}}}`}</code>
          </div>
        )

      case 'condition':
        return (
          <div className="macro-preview">
            <span className="macro-type">Condition:</span>
            <code>{`{{#if ${data.condition?.expression}}}...{{/if}}`}</code>
          </div>
        )

      case 'loop':
        return (
          <div className="macro-preview">
            <span className="macro-type">Loop:</span>
            <code>{`{{#each ${data.loop?.collection}}}...{{/each}}`}</code>
          </div>
        )

      case 'function':
        return (
          <div className="macro-preview">
            <span className="macro-type">Function:</span>
            <code>{`{{@${data.function?.name}(${data.function?.argument})}}`}</code>
          </div>
        )

      case 'date':
        return (
          <div className="macro-preview">
            <span className="macro-type">Date:</span>
            <code>
              {data.date?.relative ? '{{@relativeDate()}}' : `{{@date('${data.date?.format}')}}`}
            </code>
          </div>
        )

      case 'config':
        return (
          <div className="macro-preview">
            <span className="macro-type">Config:</span>
            <code>{`{{@config('${data.config?.key}')}}`}</code>
          </div>
        )

      default:
        return <div className="macro-preview">Unknown macro type</div>
    }
  }

  return (
    <div
      style={{
        backgroundColor: '#e8f4fd',
        border: '1px dashed #0066cc',
        borderRadius: '4px',
        padding: '12px',
        margin: '8px 0',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {renderPreview()}
      <style jsx>{`
        .macro-preview {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .macro-type {
          font-weight: 600;
          color: #0066cc;
          font-size: 12px;
          text-transform: uppercase;
        }
        code {
          background-color: rgba(255, 255, 255, 0.7);
          padding: 4px 8px;
          border-radius: 3px;
          font-family: 'SF Mono', Monaco, monospace;
          font-size: 13px;
          color: #333;
        }
      `}</style>
    </div>
  )
}
