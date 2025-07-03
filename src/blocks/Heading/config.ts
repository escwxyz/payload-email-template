import { Block } from 'payload'
import { textAlignment } from '../../fields/alignments.js'
import { createStyleField } from '../../fields/style.js'
import { getPluginConfig } from '../../store.js'

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
        type: 'text',
        required: true,
        localized: isLocalizationEnabled,
      },
      {
        name: 'level',
        type: 'select',
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
      textAlignment,
      createStyleField(),
    ],
  }
}
