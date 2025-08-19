import type { Block } from 'payload'
import { textAlignment } from '../../fields/alignments.js'
import { createStyleField } from '../../fields/style.js'
import { getPluginConfig } from '../../store.js'
import { createLinkBlock } from '../Link/config.js'
import { createMacroConfig } from '../Macro/config.js'

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
        name: 'content',
        type: 'blocks',
        label: 'Content',
        required: true,
        blocks: [
          createLinkBlock(),
          {
            slug: 'plainText',
            interfaceName: 'ReactEmailPlainTextBlock',
            admin: {
              group: 'React Email Components',
            },
            fields: [
              {
                name: 'content',
                type: 'textarea',
                label: 'Content',
                required: true,
                localized: isLocalizationEnabled,
              },
            ],
          },
          createMacroConfig(),
        ],
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
                label: 'Font Size',
                options: [
                  { label: '12px', value: '0.75rem' },
                  { label: '14px', value: '0.875rem' },
                  { label: '16px', value: '1rem' },
                  { label: '18px', value: '1.125rem' },
                  { label: '20px', value: '1.25rem' },
                ],
                defaultValue: '1rem',
              },
              textAlignment,
            ],
          },
          {
            name: 'color',
            type: 'text',
            label: 'Color',
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
