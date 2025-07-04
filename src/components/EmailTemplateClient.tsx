'use client'

// organize-imports-ignore
import React from 'react'
import type { RenderEmailTemplateProps } from '../utils/renderEmailTempalte.js'
import { BlockRendererClient } from './BlockRenderer/BlockRendererClient.js'
import { Block } from '../types.js'
import { EmailTemplatePlaceholder } from './EmailTemplatePlaceholder.js'
import type { UploadCollectionSlug } from 'payload'

export const EmailTemplateClient = (
  props: Omit<RenderEmailTemplateProps, 'format'> & {
    imageCollectionSlug: UploadCollectionSlug
  },
) => {
  const { data, imageCollectionSlug } = props

  const body = data.body

  const defaultStyle = {
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'auto',
  }

  return (
    <div
      id="email-template-client"
      style={{
        ...defaultStyle,
        ...data.style,
      }}
    >
      {body && Array.isArray(body) && body.length > 0 ? (
        body.map((block: Block) =>
          BlockRendererClient({ block, previewMode: 'preview', imageCollectionSlug }),
        )
      ) : (
        <EmailTemplatePlaceholder />
      )}
    </div>
  )
}
