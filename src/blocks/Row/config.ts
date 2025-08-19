import type { Block } from 'payload'
import { horizontalAlignments, verticalAlignments } from '../../fields/alignments.js'
import { createStyleField } from '../../fields/style.js'
import { createButtonBlock } from '../Button/config.js'
import { createHeadingBlock } from '../Heading/config.js'
import { ImageBlock } from '../Image/config.js'
import { createLinkBlock } from '../Link/config.js'
import { createMacroConfig } from '../Macro/config.js'
import { SpacerBlock } from '../Spacer/config.js'
import { createTextBlock } from '../Text/config.js'

export const createRowBlock = (): Block => {
  return {
    slug: 'row',
    interfaceName: 'ReactEmailRowBlock',
    admin: {
      group: 'React Email Components',
    },
    fields: [
      {
        name: 'columns',
        label: 'Columns',
        type: 'array',
        minRows: 1,
        maxRows: 4,
        fields: [
          {
            name: 'content',
            label: 'Content',
            type: 'blocks',
            blocks: [
              createTextBlock(),
              createButtonBlock(),
              createHeadingBlock(),
              ImageBlock,
              createLinkBlock(),
              SpacerBlock,
              createMacroConfig(),
            ],
          },
          {
            type: 'collapsible',
            label: 'Config',
            admin: {
              description: 'The config of the row.',
              initCollapsed: true,
            },
            fields: [
              {
                name: 'width',
                label: 'Width',
                type: 'select',
                options: ['1/4', '1/3', '1/2', '2/3', '3/4', 'full'],
                defaultValue: 'full',
              },
              horizontalAlignments,
              verticalAlignments,
              createStyleField(),
            ],
          },
        ],
      },
      createStyleField(),
    ],
  }
}
