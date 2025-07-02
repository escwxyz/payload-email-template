import { describe, expect, it } from 'vitest'
import { injectMacro } from './injectMacro.js'

describe('injectMacro', () => {
  it('replaces a single macro', () => {
    expect(injectMacro('Hello {{name}}', { name: 'Alice' })).toBe('Hello Alice')
  })

  it('leaves unknown macros unchanged', () => {
    expect(injectMacro('Hello {{name}}', {})).toBe('Hello {{name}}')
  })

  it('replaces multiple macros', () => {
    expect(injectMacro('Hi {{first}} {{last}}', { first: 'A', last: 'B' })).toBe('Hi A B')
  })

  it('trims whitespace in macro name', () => {
    expect(injectMacro('Hi {{ name }}', { name: 'A' })).toBe('Hi A')
  })
})
