import type { Block } from 'payload'
import { createStyleField } from '../../fields/style.js'
import { getPluginConfig } from '../../store.js'

export const createLinkBlock = (): Block => {
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
        localized: getPluginConfig()?.isLocalizationEnabled,
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
      createStyleField(),
    ],
  }
}
