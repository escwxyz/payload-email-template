import type { TextFieldValidation } from 'payload'

export const validateUrlString: TextFieldValidation = (value) => {
  if (!value) {
    return true
  }

  if (typeof value !== 'string') {
    return 'URL must be a string'
  }

  try {
    new URL(value)
  } catch (e) {
    return 'URL must be a valid URL'
  }

  return true
}
