import { Block } from 'payload'
import { horizontalAlignments } from '../../fields/alignments.js'
import { createStyleField } from '../../fields/style.js'
import { getPluginConfig } from '../../store.js'

export const createButtonBlock = (): Block => {
  return {
    slug: 'button',
    interfaceName: 'ReactEmailButtonBlock',
    labels: {
      singular: 'Button',
      plural: 'Buttons',
    },
    admin: {
      group: 'React Email Components',
    },
    fields: [
      {
        name: 'text',
        type: 'text',
        label: 'Button Text',
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
        type: 'collapsible',
        label: 'Config',
        admin: {
          description: 'The config of the button.',
          initCollapsed: true,
        },
        fields: [
          {
            name: 'variant',
            type: 'select',
            options: [
              { label: 'Primary', value: 'primary' },
              { label: 'Secondary', value: 'secondary' },
              { label: 'Outline', value: 'outline' },
            ],
            defaultValue: 'primary',
          },
          {
            name: 'backgroundColor',
            type: 'text',
            defaultValue: '#007bff',
          },
          {
            name: 'textColor',
            type: 'text',
            defaultValue: '#ffffff',
          },
          {
            name: 'borderRadius',
            type: 'select',
            options: [
              { label: 'None', value: '0px' },
              { label: 'Small', value: '4px' },
              { label: 'Medium', value: '8px' },
              { label: 'Large', value: '16px' },
              { label: 'Full', value: '999px' },
            ],
            defaultValue: '4px',
          },
          {
            name: 'padding',
            type: 'select',
            options: [
              { label: 'Small', value: '8px 16px' },
              { label: 'Medium', value: '12px 24px' },
              { label: 'Large', value: '16px 32px' },
            ],
            defaultValue: '12px 24px',
          },
          horizontalAlignments,
          createStyleField(),
        ],
      },
    ],
  }
}
