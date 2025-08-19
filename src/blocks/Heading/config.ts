import type { Block } from 'payload'
import { createStyleField } from '../../fields/style.js'
import { getPluginConfig } from '../../store.js'
import { createLinkBlock } from '../Link/config.js'
import { createMacroConfig } from '../Macro/config.js'

export const createHeadingBlock = (): Block => {
  const isLocalizationEnabled = getPluginConfig()?.isLocalizationEnabled

  return {
    slug: 'heading',
    interfaceName: 'ReactEmailHeadingBlock',
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
        name: 'level',
        type: 'select',
        label: 'Heading Level',
        defaultValue: 'h2',
        options: [
          {
            label: 'H1',
            value: 'h1',
          },
          {
            label: 'H2',
            value: 'h2',
          },
          {
            label: 'H3',
            value: 'h3',
          },
          {
            label: 'H4',
            value: 'h4',
          },
          {
            label: 'H5',
            value: 'h5',
          },
          {
            label: 'H6',
            value: 'h6',
          },
        ],
      },
      {
        type: 'collapsible',
        label: 'Config',
        admin: {
          description: 'The config of the heading.',
          initCollapsed: true,
        },
        fields: [
          {
            name: 'textAlign',
            type: 'select',
            label: 'Text Alignment',
            options: [
              {
                label: 'Left',
                value: 'left',
              },
              {
                label: 'Center',
                value: 'center',
              },
              {
                label: 'Right',
                value: 'right',
              },
            ],
            defaultValue: 'left',
          },
          createStyleField(),
        ],
      },
    ],
  }
}
