import { readFileSync } from 'node:fs'
import path from 'node:path'
import type { Payload } from 'payload'

import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const seedEmailTemplates = async (payload: Payload) => {
  console.log('Seeding images...')

  const { totalDocs: imageTotalDocs } = await payload.count({
    collection: 'media',
  })

  const imageFile = readFileSync(path.resolve(__dirname, './../aws-logo.png'))

  const file = {
    data: imageFile,
    mimetype: 'image/png',
    name: 'aws-logo.png',
    size: imageFile.length,
  }

  if (!imageTotalDocs) {
    await payload.create({
      collection: 'media',
      data: {},
      file,
    })
  }

  const imageDoc = await payload.find({
    collection: 'media',
    where: {
      filename: {
        equals: 'aws-logo.png',
      },
    },
    limit: 1,
  })

  const image = imageDoc.docs[0]

  console.log('Image:', image)

  console.log('Seeding email templates...')

  const { totalDocs: emailTemplateTotalDocs } = await payload.count({
    collection: 'email-templates',
  })

  if (!emailTemplateTotalDocs) {
    const emailTemplate = await payload.create({
      collection: 'email-templates',
      data: {
        name: 'Demo Email Template',
        description: 'This is a demo email template',
        subject: 'Verify your email address for {{companyName}}',
        title: 'Demo Email Template',
        fontFamily: ['Arial'],
        fallbackFontFamily: ['Helvetica', 'sans-serif'],
        body: [
          {
            blockType: 'container',
            content: [
              {
                blockType: 'section',
                content: [
                  {
                    blockType: 'image',
                    image: image,
                    alt: 'logo',
                    width: 75,
                    height: 45,
                    objectFit: 'cover',
                    align: 'center',
                  },
                ],
                backgroundColor: '#252f3d',
                padding: '32px',

                style: {
                  alignItems: 'center',
                  justifyContent: 'center',
                  display: 'flex',
                },
              },

              {
                blockType: 'section',
                content: [
                  {
                    blockType: 'heading',
                    content: [
                      {
                        blockType: 'plainText',
                        content: 'Verify your email address',
                      },
                    ],
                    level: 'h3',
                    textAlign: 'left',
                    blockName: 'Verify your email address',
                  },

                  {
                    blockType: 'text',
                    content: [
                      {
                        blockType: 'plainText',
                        content: 'Dear ',
                      },
                      {
                        blockType: 'macro',
                        type: 'variable',
                        variable: 'user.firstName',
                      },
                      {
                        blockType: 'plainText',
                        content:
                          ", thanks for starting the new AWS account creation process. We want to make sure it's really you. Please enter the following verification code when prompted. If you don't want to create an account, you can ignore this message.",
                      },
                    ],
                    fontSize: '1rem',
                    textAlign: 'left',
                    color: '#000000',
                    lineHeight: '1.6',
                  },

                  {
                    blockType: 'text',

                    content: [
                      {
                        blockType: 'plainText',
                        content: 'Verification code',
                      },
                    ],
                    fontSize: '1rem',
                    textAlign: 'center',
                    color: '#000000',
                    lineHeight: '1.6',
                  },

                  {
                    blockType: 'text',

                    content: [
                      {
                        blockType: 'plainText',
                        content: '596853',
                      },
                    ],
                    fontSize: '1.125rem',
                    textAlign: 'center',
                    color: '#000000',
                    lineHeight: '1.6',
                  },

                  {
                    blockType: 'text',

                    content: [
                      {
                        blockType: 'plainText',
                        content: '(This code is valid for 10 minutes)',
                      },
                    ],
                    fontSize: '1rem',
                    textAlign: 'center',
                    color: '#000000',
                    lineHeight: '1.6',
                  },

                  {
                    blockType: 'hr',
                    color: '#e5e5e5',
                    thickness: '1px',
                    margin: '32px 0',
                  },

                  {
                    blockType: 'text',

                    content: [
                      {
                        blockType: 'plainText',
                        content:
                          'Amazon Web Services will never email you and ask you to disclose or verify your password, credit card, or banking account number.',
                      },
                    ],
                    fontSize: '1rem',
                    textAlign: 'left',
                    color: '#000000',
                    lineHeight: '1.6',
                  },
                ],
                backgroundColor: '#fff',
                padding: '32px',
              },

              {
                blockType: 'text',

                content: [
                  {
                    blockType: 'plainText',
                    content:
                      'This message was produced and distributed by Amazon Web Services, Inc., 410 Terry Ave. North, Seattle, WA 98109. © 2022, Amazon Web Services, Inc.. All rights reserved. AWS is a registered trademark of ',
                  },

                  {
                    blockType: 'link',
                    text: 'Amazon.com',
                    url: 'https://amazon.com',
                    target: '_blank',
                    color: '#007bff',
                    underline: true,
                  },

                  {
                    blockType: 'plainText',
                    content: ', Inc. View our ',
                  },

                  {
                    blockType: 'link',
                    text: 'privacy policy',
                    url: 'https://amazon.com',
                    target: '_blank',
                    color: '#007bff',
                    underline: true,
                  },

                  {
                    blockType: 'plainText',
                    content: '.',
                  },
                ],
                fontSize: '1rem',
                textAlign: 'left',
                color: '#000000',
                lineHeight: '1.6',
                style: {
                  padding: '1rem',
                },
              },
            ],

            style: {
              backgroundColor: '#eee',
            },
          },
        ],
        style: {
          backgroundColor: '#fff',
          color: '#212121',
        },
      },
    })

    console.log('Email template:', emailTemplate?.id)

    return emailTemplate
  }
}
