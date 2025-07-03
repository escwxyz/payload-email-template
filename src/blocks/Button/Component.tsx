// organize-imports-ignore
import React from 'react'
import { Button } from '@react-email/components'
import type { ButtonBlock as ButtonBlockType } from '../../types.js'
import { injectMacro } from '../../utils/injectMacro.js'
import { getPluginConfig } from '../../store.js'

export const ButtonBlock = ({ block }: { block: ButtonBlockType }) => {
  const {
    variant,
    text,
    style,
    url,
    target,
    textColor,
    backgroundColor,
    borderRadius,
    padding,
    horizontalAlign,
    verticalAlign,
  } = block

  const primaryStyle = {
    backgroundColor: '#000',
    color: '#fff',
    borderRadius: '4px',
    padding: '10px 20px',
    textAlign: 'center',
    verticalAlign: 'middle',
  }

  const secondaryStyle = {
    backgroundColor: '#fff',
    color: '#000',
    borderRadius: '4px',
    padding: '10px 20px',
    textAlign: 'center',
    verticalAlign: 'middle',
  }

  const outlineStyle = {
    backgroundColor: 'transparent',
    color: '#000',
    borderRadius: '4px',
    padding: '10px 20px',
    textAlign: 'center',
    verticalAlign: 'middle',
  }

  const mergedStyle = {
    ...(variant === 'primary'
      ? primaryStyle
      : variant === 'secondary'
        ? secondaryStyle
        : outlineStyle),
    ...style,
    padding: padding || '10px 20px',
    textAlign: horizontalAlign || 'center',
    verticalAlign: verticalAlign || 'middle',
    ...(backgroundColor ? { backgroundColor } : {}),
    ...(textColor ? { color: textColor } : {}),
    ...(borderRadius ? { borderRadius } : {}),
    // display: 'inline-block',
  }

  return (
    <Button href={url} style={mergedStyle} target={target}>
      {injectMacro(text, getPluginConfig()?.macros)}
    </Button>
  )
}
