import type { Block } from 'payload'
import { createStyleField } from '../../fields/style.js'
import { createButtonBlock } from '../Button/config.js'
import { createHeadingBlock } from '../Heading/config.js'
import { createHrBlock } from '../Hr/config.js'
import { ImageBlock } from '../Image/config.js'
import { createLinkBlock } from '../Link/config.js'
import { createRowBlock } from '../Row/config.js'
import { SpacerBlock } from '../Spacer/config.js'
import { createTextBlock } from '../Text/config.js'

export const createSectionBlock = (): Block => {
  return {
    slug: 'section',
    interfaceName: 'ReactEmailSectionBlock',
    admin: {
      group: 'React Email Components',
    },
    fields: [
      {
        name: 'content',
        type: 'blocks',
        blocks: [
          createRowBlock(),
          createHeadingBlock(),
          ImageBlock,
          createButtonBlock(),
          createTextBlock(),
          createLinkBlock(),
          createHrBlock(),
          SpacerBlock,
        ],
      },
      {
        name: 'backgroundColor',
        type: 'text',
        admin: {
          description: 'CSS color value (e.g., #ffffff, rgba(255,255,255,0.9))',
        },
        defaultValue: '#ffffff',
      },
      {
        name: 'padding',
        type: 'select',
        options: [
          { label: 'None', value: '0' },
          { label: 'Small', value: '16px' },
          { label: 'Medium', value: '32px' },
          { label: 'Large', value: '48px' },
        ],
        defaultValue: '32px',
      },
      createStyleField(),
    ],
  }
}
