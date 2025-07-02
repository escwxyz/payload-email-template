import type { Block } from 'payload'
import { horizontalAlignments } from '../../fields/alignments.js'

export const ImageBlock: Block = {
  slug: 'image',
  interfaceName: 'ReactEmailImageBlock',
  admin: {
    group: 'React Email Components',
  },
  fields: [
    {
      name: 'width',
      type: 'number',
      min: 0,
      admin: {
        description: 'Width in pixels, leave empty for auto',
      },
    },
    {
      name: 'height',
      type: 'number',
      min: 0,
      admin: {
        description: 'Height in pixels, leave empty for auto',
      },
    },
    {
      name: 'objectFit',
      type: 'select',
      options: [
        { label: 'Cover', value: 'cover' },
        { label: 'Contain', value: 'contain' },
      ],
      defaultValue: 'cover',
    },
    horizontalAlignments,
  ],
}
