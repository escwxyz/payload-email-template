export interface MacroContext {
  variables?: Record<string, string>
  config?: Record<string, any>
  functions?: Record<string, (...args: any[]) => string>
  locale?: string
}

export const injectMacro = (str: string, context: MacroContext = {}) => {
  const { variables = {}, config = {}, functions = {}, locale = 'en' } = context

  return str.replace(/{{(.*?)}}/g, (match, content) => {
    const trimmed = content.trim()

    // Function macro: {{ @function(args) }}
    if (trimmed.startsWith('@')) {
      return processFunctionMacro(trimmed, { config, functions, locale })
    }

    // Condition macro: {{ #if condition }}
    if (trimmed.startsWith('#if ')) {
      return processConditionMacro(trimmed, { variables, config })
    }

    // Loop macro: {{ #each items }}
    if (trimmed.startsWith('#each ')) {
      return processLoopMacro(trimmed, { variables, config })
    }

    // Variable macro: {{ variable }}
    return variables.hasOwnProperty(trimmed) ? variables[trimmed] : match
  })
}

// Process function macros like {{ @date(format) }}, {{ @config(key) }}
function processFunctionMacro(
  content: string,
  context: { config: Record<string, any>; functions: Record<string, Function>; locale: string },
): string {
  const { config, functions, locale } = context

  if (content.startsWith('@date')) {
    const formatMatch = content.match(/@date\(([^)]*)\)/)
    const format = formatMatch ? formatMatch[1].replace(/['"]/g, '') : 'YYYY-MM-DD'
    return formatDate(new Date(), format, locale)
  }

  if (content.startsWith('@config')) {
    const keyMatch = content.match(/@config\(([^)]*)\)/)
    const key = keyMatch ? keyMatch[1].replace(/['"]/g, '') : ''
    return config[key] || ''
  }

  const funcMatch = content.match(/@(\w+)\(([^)]*)\)/)
  if (funcMatch) {
    const [, funcName, argsStr] = funcMatch
    const func = functions[funcName]
    if (func) {
      try {
        const args = argsStr ? JSON.parse(`[${argsStr}]`) : []
        return func(...args)
      } catch (e) {
        console.warn(`Error executing function ${funcName}:`, e)
        return content
      }
    }
  }

  return content
}

// TODO
function processConditionMacro(
  content: string,
  context: { variables: Record<string, string>; config: Record<string, any> },
): string {
  const conditionMatch = content.match(/#if\s+(.+)/)
  if (conditionMatch) {
    const condition = conditionMatch[1]
    const { variables, config } = context

    if (variables[condition] || config[condition]) {
      return '[CONDITION_TRUE]'
    }
  }

  return '[CONDITION_FALSE]'
}

// TODO
function processLoopMacro(
  content: string,
  context: { variables: Record<string, string>; config: Record<string, any> },
): string {
  return '[LOOP_PLACEHOLDER]'
}

function formatDate(date: Date, format: string, locale: string): string {
  const options: Intl.DateTimeFormatOptions = {}

  switch (format.toLowerCase()) {
    case 'yyyy-mm-dd':
      return date.toISOString().split('T')[0]
    case 'mm/dd/yyyy':
      return date.toLocaleDateString('en-US')
    case 'dd/mm/yyyy':
      return date.toLocaleDateString('en-GB')
    case 'dd.mm.yyyy':
      return date.toLocaleDateString('de-DE')
    case 'long':
      options.dateStyle = 'long'
      break
    case 'short':
      options.dateStyle = 'short'
      break
    default:
      return date.toLocaleDateString(locale)
  }

  return date.toLocaleDateString(locale, options)
}
