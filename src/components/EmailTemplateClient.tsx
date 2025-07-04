'use client'

// organize-imports-ignore
import React from 'react'
import type { RenderEmailTemplateProps } from '../utils/renderEmailTempalte.js'
import styles from './EmailTemplate.module.css'
import { BlockRendererClient } from './BlockRendererFactory.js'
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

  return (
    <div id="email-template-client" className={styles.defaultBodyStyle} style={data.style}>
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
