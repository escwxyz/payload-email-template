import { describe, expect, it, vi } from 'vitest'
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

    it('should process loop macro and pass itemContext to renderBlocks', () => {
      const macro: MacroBlock = {
        blockType: 'macro',
        type: 'loop',
        loop: {
          collection: 'users',
          itemName: 'user',
          content: [
            {
              blockType: 'text',
              content: [
                {
                  blockType: 'plainText',
                  content: 'Hello {{user.name}}!',
                },
              ],
            },
          ],
        },
      }

      const context = {
        variables: {
          users: [
            { name: 'John', email: 'john@test.com' },
            { name: 'Jane', email: 'jane@test.com' },
          ],
        },
      }

      const capturedContexts: Array<Record<string, any>> = []
      const mockRenderBlocks = vi.fn((_blocks: any[], itemContext?: Record<string, any>) => {
        if (itemContext) {
          capturedContexts.push(itemContext)
        }
        return `Rendered: ${itemContext?.variables?.user?.name || 'unknown'}`
      })

      processMacro(macro, context, mockRenderBlocks)

      // Should call renderBlocks twice (once for each user)
      expect(mockRenderBlocks).toHaveBeenCalledTimes(2)

      // Check that itemContext was passed correctly
      expect(capturedContexts).toHaveLength(2)
      expect(capturedContexts[0].variables.user).toEqual({ name: 'John', email: 'john@test.com' })
      expect(capturedContexts[0].variables.userIndex).toBe(0)
      expect(capturedContexts[1].variables.user).toEqual({ name: 'Jane', email: 'jane@test.com' })
      expect(capturedContexts[1].variables.userIndex).toBe(1)

      // Check that original context is preserved
      expect(capturedContexts[0].variables.users).toEqual(context.variables.users)
      expect(capturedContexts[1].variables.users).toEqual(context.variables.users)
    })

    it('should process condition macro and pass context to renderBlocks', () => {
      const macro: MacroBlock = {
        blockType: 'macro',
        type: 'condition',
        condition: {
          expression: 'isVip',
          trueContent: [
            {
              blockType: 'text',
              content: [
                {
                  blockType: 'plainText',
                  content: 'VIP content',
                },
              ],
            },
          ],
          falseContent: [
            {
              blockType: 'text',
              content: [
                {
                  blockType: 'plainText',
                  content: 'Regular content',
                },
              ],
            },
          ],
        },
      }

      const context = {
        variables: {
          isVip: true,
        },
      }

      let capturedContext: Record<string, unknown> | undefined
      const mockRenderBlocks = vi.fn((_blocks: any[], passedContext?: Record<string, unknown>) => {
        capturedContext = passedContext
        return 'Rendered content'
      })

      processMacro(macro, context, mockRenderBlocks)

      // Should call renderBlocks once (for true condition)
      expect(mockRenderBlocks).toHaveBeenCalledTimes(1)
      expect(mockRenderBlocks).toHaveBeenCalledWith(macro.condition?.trueContent, context)

      // Check that context was passed correctly
      expect(capturedContext).toEqual(context)
    })
  })
})
