'use client'

// organize-imports-ignore
import React from 'react'
import { useRowLabel } from '@payloadcms/ui'

export const HeadingRowLabel = () => {
  const result = useRowLabel<string>()

  return <div>{result.data.slice(0, 10)}</div>
}
