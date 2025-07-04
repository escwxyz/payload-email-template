// organize-imports-ignore
import React from 'react'
import { Body, Font, Head, Html, Preview } from '@react-email/components'
import type { RenderEmailTemplateProps } from '../utils/renderEmailTemplate.js'
import { Block, FallbackFont } from '../types.js'

import { EmailTemplatePlaceholder } from './EmailTemplatePlaceholder.js'
import { BlockRendererServer } from './BlockRenderer/BlockRendererServer.js'

export const EmailTemplateServer = (props: Omit<RenderEmailTemplateProps, 'format'>) => {
  const { data, locale } = props

  const { fontFamily, fallbackFontFamily, webFont, fontWeight, fontStyle, style } = data

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
      <Body
        style={{
          ...defaultStyle,
          ...style,
        }}
      >
        <Preview>{data?.subject || 'Untitled Email'}</Preview>
        {body && Array.isArray(body) && body.length > 0 ? (
          body.map((block: Block) => (
            <React.Fragment key={block.id}>
              <BlockRendererServer block={block} previewMode="render" />
            </React.Fragment>
          ))
        ) : (
          <EmailTemplatePlaceholder />
        )}
      </Body>
    </Html>
  )
}
