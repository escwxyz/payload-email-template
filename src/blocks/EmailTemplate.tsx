import { Body, Font, Head, Html, Preview } from '@react-email/components'
import { Block, FallbackFont } from '../types.js'
import type { RenderEmailTemplateProps } from '../utils/renderEmailTempalte.js'
import { BlockRenderer } from './BlockRenderer.js'

type EmailTemplateProps = Omit<RenderEmailTemplateProps, 'format'>

export const EmailTemplate = (props: EmailTemplateProps) => {
  const { data, locale } = props

  const { fontFamily, fallbackFontFamily, webFont, fontWeight, fontStyle, style } = data

  const bodyBlocks = data.body?.map((block: Block) => BlockRenderer({ block }))

  return (
    <Html
      {...(locale ? { lang: locale } : {})}
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
          margin: 0,
          boxSizing: 'border-box',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          ...style,
        }}
      >
        <Preview>{data?.subject || 'Untitled Email'}</Preview>
        {bodyBlocks || (
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
  )
}
