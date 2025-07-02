export const injectMacro = (str: string, macros: Record<string, string> = {}) => {
  return str.replace(/{{(.*?)}}/g, (match, macroName) => {
    const key = macroName.trim()
    return macros.hasOwnProperty(key) ? macros[key] : match
  })
}
