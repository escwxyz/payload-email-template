import type { CollectionConfig } from 'payload'
import { createContainerBlock } from '../blocks/Container/config.js'
import { generate } from '../endpoints/generate.js'
import { createStyleField } from '../fields/style.js'
import type { FallbackFont, FontFormat, PluginOptions } from '../types.js'
import { validateUrlString } from '../validations/validateUrlString.js'

const fallbackFontFamilyOptions: FallbackFont[] = [
  'Arial',
  'Helvetica',
  'Verdana',
  'Georgia',
  'Times New Roman',
  'serif',
  'sans-serif',
  'monospace',
  'cursive',
  'fantasy',
]

const fontFormatOptions: FontFormat[] = [
  'woff',
  'woff2',
  'truetype',
  'opentype',
  'embedded-opentype',
  'svg',
]

export const createEmailTemplatesCollection = (
  options: PluginOptions & {
    isLocalizationEnabled: boolean
  },
): CollectionConfig => {
  const { isLocalizationEnabled } = options
  const baseConfig: CollectionConfig = {
    slug: 'email-templates',
    admin: {
      useAsTitle: 'name',
    },
    access: options.collectionAccess || {
      read: ({ req }) => Boolean(req.user),
    },
    fields: [
      {
        type: 'tabs',
        tabs: [
          {
            label: 'Content',
            fields: [
              {
                type: 'row',
                fields: [
                  {
                    name: 'name',
                    type: 'text',
                    required: true,
                    label: 'Template Name',
                    unique: true,
                  },
                  {
                    name: 'description',
                    type: 'text',
                    label: 'Description',
                    localized: isLocalizationEnabled,
                  },
                ],
              },
              {
                name: 'subject',
                type: 'text',
                label: 'Email Subject',
                required: true,
                localized: isLocalizationEnabled,
              },
              {
                label: 'Head',
                type: 'collapsible',
                admin: {
                  description: 'The head of the email template. Related to meta elements.',
                  initCollapsed: true,
                },
                fields: [
                  {
                    name: 'title',
                    label: 'Title',
                    type: 'text',
                    localized: isLocalizationEnabled,
                  },
                  {
                    type: 'collapsible',
                    label: 'Font',
                    admin: {
                      description: 'The font of the email template.',
                      initCollapsed: true,
                    },
                    fields: [
                      {
                        name: 'fontFamily',
                        type: 'text',
                        label: 'Font Family',
                        hasMany: true,
                        maxRows: 1,
                        admin: {
                          description: 'Please input only one font family here.',
                        },
                        required: true,
                        defaultValue: ['Arial'],
                      },
                      {
                        name: 'fallbackFontFamily',
                        type: 'select',
                        label: 'Fallback Font Family',
                        options: fallbackFontFamilyOptions,
                        hasMany: true,
                        required: true,
                        defaultValue: 'sans-serif',
                      },
                      {
                        name: 'webFont',
                        type: 'group',
                        fields: [
                          {
                            name: 'url',
                            type: 'text',
                            label: 'URL',
                            validate: validateUrlString,
                          },
                          {
                            name: 'format',
                            type: 'select',
                            options: fontFormatOptions,
                          },
                        ],
                      },
                      {
                        name: 'fontWeight',
                        type: 'text',
                        label: 'Font Weight',
                      },
                      {
                        name: 'fontStyle',
                        type: 'text',
                        label: 'Font Style',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Layout',
                type: 'collapsible',
                admin: {
                  description: 'The layout of the email template.',
                  initCollapsed: true,
                },
                fields: [
                  {
                    name: 'body',
                    type: 'blocks',
                    label: 'Body',
                    admin: {
                      description: 'The body of the email template. Related to the main content.',
                    },
                    minRows: 1,
                    maxRows: 1,
                    blocks: [createContainerBlock()],
                  },
                  createStyleField(),
                ],
              },
            ],
          },
          {
            label: 'Preview',
            fields: [
              {
                name: 'preview',
                type: 'ui',
                admin: {
                  components: {
                    Field: {
                      path: 'payload-email-template/rsc#EmailTemplatePreviewerServer',
                      serverProps: options,
                    },
                  },
                },
              },
            ],
          },
        ],
      },
    ],
    endpoints: [
      {
        path: '/:id/generate',
        method: 'post',
        handler: generate,
      },
    ],
  }

  return baseConfig
}
