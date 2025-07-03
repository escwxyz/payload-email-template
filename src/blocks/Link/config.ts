import type { Block } from 'payload'
import { getPluginConfig } from '../../store.js'

export const createLinkBlock = (): Block => {
  const isLocalizationEnabled = getPluginConfig()?.isLocalizationEnabled

  return {
    slug: 'link',
    interfaceName: 'ReactEmailLinkBlock',
    admin: {
      group: 'React Email Components',
    },
    fields: [
      {
        name: 'text',
        type: 'text',
        label: 'Link Text',
        required: true,
        localized: isLocalizationEnabled,
      },
      {
        name: 'url',
        type: 'text',
        required: true,
      },
      {
        name: 'target',
        type: 'select',
        options: [
          { label: 'Self', value: '_self' },
          { label: 'Blank', value: '_blank' },
        ],
        defaultValue: '_blank',
      },
      {
        name: 'color',
        type: 'text',
        defaultValue: '#007bff',
      },
      {
        name: 'underline',
        type: 'checkbox',
        defaultValue: true,
      },
    ],
  }
}
