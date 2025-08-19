import React from 'react'
import type { Block, MacroBlock } from '../types.js'

export function processMacro(
  macro: MacroBlock,
  context: Record<string, any> = {},
  renderBlocks?: (blocks: Block[]) => React.ReactNode,
): React.ReactNode | string | null {
  switch (macro.type) {
    case 'variable':
      return processVariable(macro.variable, context)

    case 'condition':
      return processCondition(macro, context, renderBlocks)

    case 'loop':
      return processLoop(macro, context, renderBlocks)

    case 'function':
      return processFunction(macro, context)

    case 'date':
      return processDate(macro)

    case 'config':
      return processConfig(macro, context)

    default:
      return null
  }
}

function processVariable(variableName?: string, context: Record<string, any> = {}): string {
  if (!variableName) return ''

  const value = getNestedValue(context.variables || {}, variableName)
  return String(value ?? '')
}

function processCondition(
  macro: MacroBlock,
  context: Record<string, any>,
  renderBlocks?: (blocks: Block[]) => React.ReactNode,
): React.ReactNode | null {
  if (!macro.condition?.expression) return null

  const isTrue = evaluateCondition(macro.condition.expression, context)

  if (isTrue && macro.condition.trueContent && renderBlocks) {
    return renderBlocks(macro.condition.trueContent)
  }

  if (!isTrue && macro.condition.falseContent && renderBlocks) {
    return renderBlocks(macro.condition.falseContent)
  }

  return null
}

function processLoop(
  macro: MacroBlock,
  context: Record<string, any>,
  renderBlocks?: (blocks: Block[]) => React.ReactNode,
): React.ReactNode | null {
  if (!macro.loop?.collection || !macro.loop.content || !renderBlocks) return null

  const collection = getNestedValue(context.variables || {}, macro.loop.collection)

  if (!Array.isArray(collection)) return null

  const itemName = macro.loop.itemName || 'item'

  return React.createElement(
    React.Fragment,
    {},
    ...collection.map((item, index) => {
      const itemContext = {
        ...context,
        variables: {
          ...context.variables,
          [itemName]: item,
          [`${itemName}Index`]: index,
        },
      }

      return React.createElement('div', { key: index }, renderBlocks(macro.loop!.content!))
    }),
  )
}

function processFunction(macro: MacroBlock, context: Record<string, any>): string {
  if (!macro.function?.name || !macro.function.argument) return ''

  const { name, argument, options } = macro.function
  const argValue = getNestedValue(context.variables || {}, argument) || argument

  // Check for custom functions first
  const customFunction = context.functions?.[name]
  if (typeof customFunction === 'function') {
    try {
      const result = options ? customFunction(argValue, options) : customFunction(argValue)
      return String(result)
    } catch (error) {
      console.warn(`Error executing custom function ${name}:`, error)
      return String(argValue)
    }
  }

  // Built-in functions
  switch (name) {
    case 'uppercase':
      return String(argValue).toUpperCase()

    case 'lowercase':
      return String(argValue).toLowerCase()

    case 'capitalize':
      return String(argValue).charAt(0).toUpperCase() + String(argValue).slice(1).toLowerCase()

    case 'truncate': {
      const length = options ? Number.parseInt(options, 10) : 50
      const str = String(argValue)
      return str.length > length ? `${str.substring(0, length)}...` : str
    }

    case 'formatNumber': {
      const num = parseFloat(String(argValue))
      if (Number.isNaN(num)) return String(argValue)
      return new Intl.NumberFormat(options || 'en-US').format(num)
    }

    default:
      return String(argValue)
  }
}

function processDate(macro: MacroBlock): string {
  const now = new Date()

  if (macro.date?.relative) {
    return formatRelativeTime(now)
  }

  const format = macro.date?.format || 'YYYY-MM-DD'
  return formatDate(now, format)
}

function processConfig(macro: MacroBlock, context: Record<string, any>): string {
  if (!macro.config?.key) return ''

  const value = getNestedValue(context.config || {}, macro.config.key)
  return String(value ?? macro.config.fallback ?? '')
}

function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj)
}

function evaluateCondition(expression: string, context: Record<string, any>): boolean {
  // Simple expression evaluation - can be enhanced for more complex conditions
  const trimmed = expression.trim()

  // Handle negation
  if (trimmed.startsWith('!')) {
    return !evaluateCondition(trimmed.slice(1), context)
  }

  // Handle simple comparisons
  if (trimmed.includes('==')) {
    const [left, right] = trimmed.split('==').map((s) => s.trim())
    return evaluateValue(left, context) === evaluateValue(right, context)
  }

  if (trimmed.includes('!=')) {
    const [left, right] = trimmed.split('!=').map((s) => s.trim())
    return evaluateValue(left, context) !== evaluateValue(right, context)
  }

  // Handle simple variable lookup
  const value = getNestedValue(context.variables || {}, trimmed)
  return Boolean(value)
}

function evaluateValue(expression: string, context: Record<string, any>): any {
  const trimmed = expression.trim()

  // String literal
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1)
  }

  // Number literal
  if (!Number.isNaN(Number(trimmed))) {
    return Number(trimmed)
  }

  // Boolean literal
  if (trimmed === 'true') return true
  if (trimmed === 'false') return false

  // Variable lookup
  return getNestedValue(context.variables || {}, trimmed)
}

function formatDate(date: Date, format: string): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
}

function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  return 'just now'
}

// Function to inject macros into text content (for inline macros in text blocks)
export function injectMacros(text: string, context: Record<string, any> = {}): string {
  if (!text) return ''

  // Replace {{variable}} patterns
  const variableRegex = /\{\{([^}]+)\}\}/g
  return text.replace(variableRegex, (match, variableName) => {
    const trimmed = variableName.trim()

    // Handle function calls like {{@uppercase(name)}}
    if (trimmed.startsWith('@')) {
      // Handle config calls like {{@config('key')}} or {{@config("key")}}
      if (trimmed.startsWith('@config')) {
        const configMatch = trimmed.match(/@config\(\s*['"]([^'"]+)['"]\s*\)/)
        if (configMatch) {
          const [, key] = configMatch
          const mockMacro: MacroBlock = {
            blockType: 'macro',
            type: 'config',
            config: { key },
          }

          const result = processConfig(mockMacro, context)
          return String(result)
        }
      }

      // Handle date calls like {{@date('YYYY-MM-DD')}} or {{@date("YYYY-MM-DD")}}
      if (trimmed.startsWith('@date')) {
        const dateMatch = trimmed.match(/@date\(\s*['"]([^'"]+)['"]\s*\)/)
        const format = dateMatch ? dateMatch[1] : 'YYYY-MM-DD'

        const mockMacro: MacroBlock = {
          blockType: 'macro',
          type: 'date',
          date: { format },
        }

        const result = processDate(mockMacro)
        return String(result)
      }

      // Handle other function calls like {{@uppercase(name)}}
      const functionMatch = trimmed.match(/@(\w+)\(([^)]*)\)/)
      if (functionMatch) {
        const [, functionName, args] = functionMatch
        const argValue = args.trim()

        const mockMacro: MacroBlock = {
          blockType: 'macro',
          type: 'function',
          function: {
            name: functionName,
            argument: argValue,
          },
        }

        const result = processFunction(mockMacro, context)
        return String(result)
      }
    }


    // Regular variable substitution
    const value = getNestedValue(context.variables || {}, trimmed)
    return String(value ?? match) // Return original if not found
  })
}
