import type { Block } from 'payload'
import { createStyleField } from '../../fields/style.js'

export const HrBlock: Block = {
  slug: 'hr',
  interfaceName: 'ReactEmailHrBlock',
  admin: {
    group: 'React Email Components',
  },
  fields: [
    {
      name: 'color',
      type: 'text',
      label: 'Color',
      defaultValue: '#e5e5e5',
    },
    {
      name: 'thickness',
      type: 'select',
      label: 'Thickness',
      options: [
        { label: '1px', value: '1px' },
        { label: '2px', value: '2px' },
        { label: '3px', value: '3px' },
      ],
      defaultValue: '1px',
    },
    {
      name: 'margin',
      type: 'select',
      label: 'Margin',
      options: [
        { label: 'Small', value: '16px 0' },
        { label: 'Medium', value: '32px 0' },
        { label: 'Large', value: '48px 0' },
      ],
      defaultValue: '32px 0',
    },
    createStyleField(),
  ],
}
