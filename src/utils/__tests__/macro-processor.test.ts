import { describe, expect, it } from 'vitest'
import type { MacroBlock } from '../../types.js'
import { injectMacros, processMacro } from '../macro-processor.js'

describe('macro-processor', () => {
  describe('injectMacros', () => {
    it('should inject simple variables', () => {
      const text = 'Hello {{name}}, welcome to {{company}}!'
      const context = {
        variables: {
          name: 'John',
          company: 'Acme Corp',
        },
      }

      const result = injectMacros(text, context)
      expect(result).toBe('Hello John, welcome to Acme Corp!')
    })

    it('should handle nested variables', () => {
      const text = 'Hello {{user.firstName}} {{user.lastName}}'
      const context = {
        variables: {
          user: {
            firstName: 'John',
            lastName: 'Doe',
          },
        },
      }

      const result = injectMacros(text, context)
      expect(result).toBe('Hello John Doe')
    })

    it('should handle function macros', () => {
      const text = 'Hello {{@uppercase(name)}}'
      const context = {
        variables: {
          name: 'john',
        },
      }

      const result = injectMacros(text, context)
      expect(result).toBe('Hello JOHN')
    })

    it('should handle config macros', () => {
      const text = 'Welcome to {{@config("appName")}}'
      const context = {
        config: {
          appName: 'My App',
        },
      }

      const result = injectMacros(text, context)
      expect(result).toBe('Welcome to My App')
    })

    it('should handle date macros', () => {
      const text = 'Today is {{@date("YYYY-MM-DD")}}'
      const context = {}

      const result = injectMacros(text, context)
      // Should match format YYYY-MM-DD
      expect(result).toMatch(/Today is \d{4}-\d{2}-\d{2}/)
    })
  })

  describe('processMacro', () => {
    it('should process variable macro', () => {
      const macro: MacroBlock = {
        blockType: 'macro',
        type: 'variable',
        variable: 'name',
      }

      const context = {
        variables: {
          name: 'John',
        },
      }

      const result = processMacro(macro, context)
      expect(result).toBe('John')
    })

    it('should process function macro', () => {
      const macro: MacroBlock = {
        blockType: 'macro',
        type: 'function',
        function: {
          name: 'uppercase',
          argument: 'name',
        },
      }

      const context = {
        variables: {
          name: 'john',
        },
      }

      const result = processMacro(macro, context)
      expect(result).toBe('JOHN')
    })

    it('should process custom function macro', () => {
      const macro: MacroBlock = {
        blockType: 'macro',
        type: 'function',
        function: {
          name: 'customFormat',
          argument: 'name',
        },
      }

      const context = {
        variables: {
          name: 'john',
        },
        functions: {
          customFormat: (value: string) => `[${value}]`,
        },
      }

      const result = processMacro(macro, context)
      expect(result).toBe('[john]')
    })

    it('should process config macro', () => {
      const macro: MacroBlock = {
        blockType: 'macro',
        type: 'config',
        config: {
          key: 'appName',
        },
      }

      const context = {
        config: {
          appName: 'My App',
        },
      }

      const result = processMacro(macro, context)
      expect(result).toBe('My App')
    })

    it('should use fallback for config macro', () => {
      const macro: MacroBlock = {
        blockType: 'macro',
        type: 'config',
        config: {
          key: 'missingKey',
          fallback: 'Default Value',
        },
      }

      const context = {
        config: {},
      }

      const result = processMacro(macro, context)
      expect(result).toBe('Default Value')
    })
  })
})
