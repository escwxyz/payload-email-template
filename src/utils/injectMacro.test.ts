import { describe, expect, it } from 'vitest'
import { injectMacro } from './injectMacro.js'

describe('injectMacro', () => {
  it('replaces a single variable macro', () => {
    expect(injectMacro('Hello {{name}}', { variables: { name: 'Alice' } })).toBe('Hello Alice')
  })

  it('leaves unknown macros unchanged', () => {
    expect(injectMacro('Hello {{name}}', {})).toBe('Hello {{name}}')
  })

  it('replaces multiple variable macros', () => {
    expect(injectMacro('Hi {{first}} {{last}}', { variables: { first: 'A', last: 'B' } })).toBe(
      'Hi A B',
    )
  })

  it('trims whitespace in macro name', () => {
    expect(injectMacro('Hi {{ name }}', { variables: { name: 'A' } })).toBe('Hi A')
  })

  it('processes date macros', () => {
    const result = injectMacro('Today is {{ @date("YYYY-MM-DD") }}', {})
    expect(result).toMatch(/Today is \d{4}-\d{2}-\d{2}/)
  })

  it('processes config macros', () => {
    expect(
      injectMacro('Company: {{ @config("company") }}', {
        config: { company: 'Acme Corp' },
      }),
    ).toBe('Company: Acme Corp')
  })

  it('processes custom function macros', () => {
    expect(
      injectMacro('Result: {{ @uppercase("hello") }}', {
        functions: {
          uppercase: (str) => str.toUpperCase(),
        },
      }),
    ).toBe('Result: HELLO')
  })
})
