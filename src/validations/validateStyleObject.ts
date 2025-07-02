import type { JSONFieldValidation } from 'payload'
import type { CSSProperties } from 'react'
import { validCSSProperties } from '../fields/style.js'

export const validateStyleObject: JSONFieldValidation = (value) => {
  if (!value) {
    return true
  }

  let styleObj = value

  if (typeof value === 'string') {
    try {
      styleObj = JSON.parse(value)
    } catch (e) {
      return 'Style must be a valid JSON object'
    }
  }

  if (typeof styleObj !== 'object' || styleObj === null || Array.isArray(styleObj)) {
    return 'Style must be a JSON object'
  }

  for (const key in styleObj as Record<string, string | number>) {
    if (!validCSSProperties.includes(key as keyof CSSProperties) && !key.startsWith('--')) {
      return `Invalid CSS property: ${key}`
    }
    const val = styleObj[key]
    if (typeof val !== 'string' && typeof val !== 'number') {
      return `Value for ${key} must be a string or number`
    }
  }

  return true
}
