import type { Field } from 'payload'
import type { CSSProperties } from 'react'
import { getPluginConfig } from '../store.js'
import { validateStyleObject } from '../validations/validateStyleObject.js'

export const validCSSProperties: (keyof CSSProperties)[] = [
  'color',
  'backgroundColor',
  'background',
  'fontSize',
  'margin',
  'padding',
  'border',
  'width',
  'height',
  'display',
  'flexDirection',
  'alignItems',
  'justifyContent',
  'flexWrap',
  'flexGrow',
  'flexShrink',
  'flexBasis',
  'flex',
  'gap',
  'gridTemplateColumns',
  'gridTemplateRows',
  'gridTemplateAreas',
  'borderRadius',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
  'borderTop',
  'borderRight',
  'fontFamily',
  'fontWeight',
  'textAlign',
  'textDecoration',
  'textTransform',
  'lineHeight',
  'letterSpacing',
  // TODO
]

export const createStyleField = (): Field => {
  return {
    name: 'style',
    type: 'json',
    label: 'Style',
    admin: {
      description:
        'Additional custom style object to override the default styles, e.g. { "backgroundColor": "#333" }',
      condition: () => {
        return !getPluginConfig()?.disableStyle
      },
    },
    // NOTE: general check, not accurate enough
    validate: validateStyleObject,
  }
}
