// organize-imports-ignore
import React from 'react'
import { Body, Font, Head, Html, Preview } from '@react-email/components'
import { Block, FallbackFont, PreviewMode } from '../types.js'
import type { RenderEmailTemplateProps } from '../utils/renderEmailTempalte.js'
import { BlockRenderer } from './BlockRenderer.js'

type EmailTemplateProps = Omit<RenderEmailTemplateProps, 'format'> & {
  previewMode: PreviewMode
}

export const EmailTemplate = (props: EmailTemplateProps) => {
  const { data, locale, previewMode } = props

  const { fontFamily, fallbackFontFamily, webFont, fontWeight, fontStyle, style } = data

  const body = data.body

  const defaultBodyStyle = {
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'auto',
    ...style,
  }

  return (
    <>
      {previewMode === 'preview' ? (
        <div style={defaultBodyStyle}>
          {body && Array.isArray(body) && body.length > 0 ? (
            body.map((block: Block) => BlockRenderer({ block, previewMode: 'preview' }))
          ) : (
            <div
              style={{
                padding: '60px 20px',
                textAlign: 'center',
                color: '#6c757d',
              }}
            >
              <h3 style={{ marginBottom: '8px', fontWeight: 'normal' }}>No content yet</h3>
              <p style={{ color: '#6c757d', fontSize: '14px' }}>
                Start building your email template using the editor on the left.
              </p>
            </div>
          )}
        </div>
      ) : (
        <>
          <Html
            {...(locale ? { lang: locale } : { lang: 'en' })}
            style={{ margin: 0, padding: 0, boxSizing: 'border-box' }}
          >
            <Head>
              <meta charSet="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              {fontFamily && fallbackFontFamily && (
                <Font
                  fontFamily={fontFamily as string}
                  fallbackFontFamily={fallbackFontFamily as FallbackFont[]}
                  {...(webFont ? { url: webFont.url, format: webFont.format } : {})}
                  {...(fontWeight ? { fontWeight: fontWeight as string } : {})}
                  {...(fontStyle ? { fontStyle: fontStyle as string } : {})}
                />
              )}
              <title>{data?.title || 'Untitled Email'}</title>
            </Head>
            <Body style={defaultBodyStyle}>
              <Preview>{data?.subject || 'Untitled Email'}</Preview>
              {body && Array.isArray(body) && body.length > 0 ? (
                body.map((block: Block) => BlockRenderer({ block, previewMode: 'render' }))
              ) : (
                <div
                  style={{
                    padding: '60px 20px',
                    textAlign: 'center',
                    color: '#6c757d',
                  }}
                >
                  <h3 style={{ marginBottom: '8px', fontWeight: 'normal' }}>No content yet</h3>
                  <p style={{ color: '#6c757d', fontSize: '14px' }}>
                    Start building your email template using the editor on the left.
                  </p>
                </div>
              )}
            </Body>
          </Html>
        </>
      )}
    </>
  )
}
