import type { Block } from 'payload'
import { textAlignment } from '../../fields/alignments.js'
import { createStyleField } from '../../fields/style.js'
import { getPluginConfig } from '../../store.js'

export const createTextBlock = (): Block => {
  const isLocalizationEnabled = getPluginConfig()?.isLocalizationEnabled

  return {
    slug: 'text',
    interfaceName: 'ReactEmailTextBlock',
    admin: {
      group: 'React Email Components',
    },
    fields: [
      {
        name: 'text',
        type: 'textarea',
        label: 'Text',
        required: true,
        localized: isLocalizationEnabled,
      },
      {
        type: 'collapsible',
        label: 'Config',
        admin: {
          description: 'The config of the text.',
          initCollapsed: true,
        },
        fields: [
          {
            type: 'row',
            fields: [
              {
                name: 'fontSize',
                type: 'select',
                options: [
                  { label: '12px', value: '12px' },
                  { label: '14px', value: '14px' },
                  { label: '16px', value: '16px' },
                  { label: '18px', value: '18px' },
                  { label: '20px', value: '20px' },
                ],
                defaultValue: '16px',
              },
              textAlignment,
            ],
          },
          {
            name: 'color',
            type: 'text',
            defaultValue: '#000000',
          },

          {
            name: 'lineHeight',
            type: 'select',
            options: [
              { label: '1.2', value: '1.2' },
              { label: '1.4', value: '1.4' },
              { label: '1.6', value: '1.6' },
              { label: '1.8', value: '1.8' },
            ],
            defaultValue: '1.6',
          },
          createStyleField(),
        ],
      },
    ],
  }
}
