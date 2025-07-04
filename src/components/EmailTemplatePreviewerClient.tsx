'use client'
// organize-imports-ignore
import React from 'react'
import { Button, TextInput, useAllFormFields, useLocale } from '@payloadcms/ui'
import { reduceFieldsToValues } from 'payload/shared'
import { useEffect, useRef, useState } from 'react'
import { PluginOptions } from '../types.js'
import { injectMacro } from '../utils/injectMacro.js'
import { renderEmailTemplate } from '../utils/renderEmailTemplate.js'
import { EmailTemplateClient } from './EmailTemplateClient.js'
import styles from './EmailTemplatePreviewerClient.module.css'

const ZOOM_LEVELS = [0.75, 1, 1.5]

export const EmailTemplatePreviewerClient = ({
  config,
}: {
  config: Pick<PluginOptions, 'previewBreakpoints' | 'imageCollectionSlug'>
}) => {
  const initialBreakpoints = config.previewBreakpoints || [
    {
      name: 'mobile',
      label: 'Mobile',
      width: 375,
      height: 667,
    },
    {
      name: 'desktop',
      label: 'Desktop',
      width: 1440,
      height: 900,
    },
  ]

  const [zoom, setZoom] = useState(1)

  // TODO support dark mode

  // const { autoMode, setTheme, theme } = useTheme()

  // useEffect(() => {
  //   setTheme(theme === 'dark' ? 'light' : 'dark')
  // }, [theme])

  const [breakpoints] =
    useState<NonNullable<PluginOptions['previewBreakpoints']>>(initialBreakpoints)

  const [selectedBreakpoint, setSelectedBreakpoint] = useState(breakpoints[0])

  const [mode, setMode] = useState<'html' | 'plainText'>('html')

  const [plainText, setPlainText] = useState<string | null>(null)

  const [fields] = useAllFormFields()

  const formData = reduceFieldsToValues(fields, true)

  const [error, setError] = useState<string | null>(null)

  const [loading, setLoading] = useState(false)

  const dragContainerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const dragStart = useRef({ x: 0, y: 0, scrollLeft: 0, scrollTop: 0 })

  const locale = useLocale()

  useEffect(() => {
    const generateEmailTemplate = async () => {
      setLoading(true)
      try {
        const plainText = await renderEmailTemplate({
          data: formData,
          locale: locale.code,
          format: 'plainText',
        })

        setPlainText(plainText)
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    if (mode === 'plainText') {
      generateEmailTemplate()
    }
  }, [mode, formData, locale])

  const onMouseDown = (e: React.MouseEvent) => {
    if (!dragContainerRef.current) return
    isDragging.current = true
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      scrollLeft: dragContainerRef.current.scrollLeft,
      scrollTop: dragContainerRef.current.scrollTop,
    }
    dragContainerRef.current.style.cursor = 'grabbing'
  }
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !dragContainerRef.current) return
    const dx = e.clientX - dragStart.current.x
    const dy = e.clientY - dragStart.current.y
    dragContainerRef.current.scrollLeft = dragStart.current.scrollLeft - dx
    dragContainerRef.current.scrollTop = dragStart.current.scrollTop - dy
  }
  const onMouseUp = () => {
    isDragging.current = false
    if (dragContainerRef.current) dragContainerRef.current.style.cursor = 'grab'
  }

  const handleModeChange = () => {
    setMode(mode === 'html' ? 'plainText' : 'html')
  }

  const handleNextBreakpoint = () => {
    const currentIndex = breakpoints.findIndex((b) => b.name === selectedBreakpoint.name)
    const nextIndex = (currentIndex + 1) % breakpoints.length
    setSelectedBreakpoint(breakpoints[nextIndex])
  }

  const handleNextZoom = () => {
    const currentIndex = ZOOM_LEVELS.indexOf(zoom)
    const nextIndex = (currentIndex + 1) % ZOOM_LEVELS.length
    setZoom(ZOOM_LEVELS[nextIndex])
  }

  return (
    <div className={styles.wrapper}>
      <div style={{ marginBottom: 16 }}>
        <TextInput
          readOnly
          path="subject"
          label="Email Subject"
          value={injectMacro(formData.subject || 'Untitled', {})}
        />
      </div>
      <div className={styles.controllers}>
        <Button onClick={handleModeChange} buttonStyle="primary">
          {mode.toUpperCase()}
        </Button>

        <Button
          onClick={handleNextBreakpoint}
          buttonStyle="primary"
          disabled={mode === 'plainText'}
        >
          {selectedBreakpoint.label}
        </Button>
        <Button onClick={handleNextZoom} buttonStyle="primary" disabled={mode === 'plainText'}>
          {Math.round(zoom * 100)}%
        </Button>
      </div>
      <div
        ref={dragContainerRef}
        className={styles.container}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div
            className={styles.content}
            style={{
              width: selectedBreakpoint.width,
              height: selectedBreakpoint.height,
              transform: `scale(${zoom})`,
            }}
          >
            {mode === 'html' && !error && (
              <EmailTemplateClient
                data={formData}
                locale={locale.code}
                imageCollectionSlug={config.imageCollectionSlug || 'media'}
              />
            )}
            {mode === 'plainText' && !error && (
              <pre className={styles.plainText}>{loading ? 'Loading...' : plainText}</pre>
            )}
            {error && (
              <div style={{ color: 'red', padding: 16 }}>
                <h2>
                  <span role="img" aria-label="Warning">
                    ⚠️
                  </span>{' '}
                  Preview Error
                </h2>
                <p>Unable to generate email preview.</p>
                <div>
                  <h3>Error Details</h3>
                  <pre>{error}</pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
