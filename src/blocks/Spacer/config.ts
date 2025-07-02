import type { Block } from 'payload'

export const SpacerBlock: Block = {
  slug: 'spacer',
  interfaceName: 'ReactEmailSpacerBlock',
  admin: {
    group: 'React Email Components',
  },
  fields: [
    {
      name: 'height',
      type: 'select',
      options: [
        { label: '8px', value: '8px' },
        { label: '16px', value: '16px' },
        { label: '24px', value: '24px' },
        { label: '32px', value: '32px' },
        { label: '48px', value: '48px' },
        { label: '64px', value: '64px' },
      ],
      defaultValue: '16px',
    },
  ],
}
