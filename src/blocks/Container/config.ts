import type { Block } from 'payload'
import { createStyleField } from '../../fields/style.js'
import { createButtonBlock } from '../Button/config.js'
import { createHeadingBlock } from '../Heading/config.js'
import { createHrBlock } from '../Hr/config.js'
import { ImageBlock } from '../Image/config.js'
import { createLinkBlock } from '../Link/config.js'
import { createRowBlock } from '../Row/config.js'
import { createSectionBlock } from '../Section/config.js'
import { SpacerBlock } from '../Spacer/config.js'
import { createTextBlock } from '../Text/config.js'

export const createContainerBlock = (): Block => {
  return {
    slug: 'container',
    interfaceName: 'ReactEmailContainerBlock',
    admin: {
      group: 'React Email Components',
    },
    fields: [
      {
        name: 'content',
        type: 'blocks',
        blocks: [
          createSectionBlock(),
          createRowBlock(),
          createHeadingBlock(),
          createButtonBlock(),
          createHrBlock(),
          ImageBlock,
          createTextBlock(),
          createLinkBlock(),
          SpacerBlock,
        ],
      },
      createStyleField(),
    ],
  }
}
