import type { Block, Field } from 'payload'

export const createMacroConfig = (): Block => {
  // We'll define available blocks for nested content later to avoid circular dependencies
  const getAvailableBlocks = (): Block[] => {
    // These are simplified blocks to avoid infinite nesting
    return [
      {
        slug: 'plainText',
        interfaceName: 'ReactEmailPlainTextBlock',
        fields: [
          {
            name: 'content',
            type: 'textarea',
            label: 'Content',
            required: true,
          },
        ],
      },
    ]
  }

  const fields: Field[] = [
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'variable',
      options: [
        {
          label: 'Variable',
          value: 'variable',
        },
        {
          label: 'Condition',
          value: 'condition',
        },
        {
          label: 'Loop',
          value: 'loop',
        },
        {
          label: 'Function',
          value: 'function',
        },
        {
          label: 'Date',
          value: 'date',
        },
        {
          label: 'Config',
          value: 'config',
        },
      ],
    },
    {
      name: 'variable',
      type: 'text',
      admin: {
        condition: (_, { type }) => type === 'variable',
        description: 'Variable name to inject (e.g., firstName, company)',
      },
    },
    {
      name: 'condition',
      type: 'group',
      admin: {
        condition: (_, { type }) => type === 'condition',
      },
      fields: [
        {
          name: 'expression',
          type: 'text',
          required: true,
          admin: {
            description: 'Condition expression (e.g., isPremium, hasDiscount)',
          },
        },
        {
          name: 'trueContent',
          type: 'blocks',
          blocks: getAvailableBlocks(),
          admin: {
            description: 'Content to show when condition is true',
          },
        },
        {
          name: 'falseContent',
          type: 'blocks',
          blocks: getAvailableBlocks(),
          admin: {
            description: 'Content to show when condition is false',
          },
        },
      ],
    },
    {
      name: 'loop',
      type: 'group',
      admin: {
        condition: (_, { type }) => type === 'loop',
      },
      fields: [
        {
          name: 'collection',
          type: 'text',
          required: true,
          admin: {
            description: 'Collection to iterate over (e.g., items, products)',
          },
        },
        {
          name: 'itemName',
          type: 'text',
          defaultValue: 'item',
          admin: {
            description: 'Variable name for each item in the loop',
          },
        },
        {
          name: 'content',
          type: 'blocks',
          blocks: getAvailableBlocks(),
          admin: {
            description: 'Content to repeat for each item',
          },
        },
      ],
    },
    {
      name: 'function',
      type: 'group',
      admin: {
        condition: (_, { type }) => type === 'function',
      },
      fields: [
        {
          name: 'name',
          type: 'select',
          required: true,
          options: [
            {
              label: 'Uppercase',
              value: 'uppercase',
            },
            {
              label: 'Lowercase',
              value: 'lowercase',
            },
            {
              label: 'Capitalize',
              value: 'capitalize',
            },
            {
              label: 'Truncate',
              value: 'truncate',
            },
            {
              label: 'Format Number',
              value: 'formatNumber',
            },
          ],
        },
        {
          name: 'argument',
          type: 'text',
          required: true,
          admin: {
            description: 'Variable or value to pass to the function',
          },
        },
        {
          name: 'options',
          type: 'text',
          admin: {
            description: 'Additional options (e.g., length for truncate)',
          },
        },
      ],
    },
    {
      name: 'date',
      type: 'group',
      admin: {
        condition: (_, { type }) => type === 'date',
      },
      fields: [
        {
          name: 'format',
          type: 'text',
          defaultValue: 'YYYY-MM-DD',
          admin: {
            description: 'Date format (e.g., YYYY-MM-DD, MM/DD/YYYY)',
          },
        },
        {
          name: 'relative',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Show relative time (e.g., 2 days ago)',
          },
        },
      ],
    },
    {
      name: 'config',
      type: 'group',
      admin: {
        condition: (_, { type }) => type === 'config',
      },
      fields: [
        {
          name: 'key',
          type: 'text',
          required: true,
          admin: {
            description: 'Configuration key to access (e.g., appName, supportEmail)',
          },
        },
        {
          name: 'fallback',
          type: 'text',
          admin: {
            description: 'Default value if config key is not found',
          },
        },
      ],
    },
  ]

  const macroConfig: Block = {
    slug: 'macro',
    fields,
    interfaceName: 'MacroBlock',
    labels: {
      singular: 'Macro',
      plural: 'Macros',
    },
  }

  return macroConfig
}
