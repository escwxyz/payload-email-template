import { readFileSync } from 'node:fs'
import path from 'node:path'
import type { Payload } from 'payload'

import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const seedEmailTemplates = async (payload: Payload) => {
  const { totalDocs: imageTotalDocs } = await payload.count({
    collection: 'media',
  })

  const imageFile = readFileSync(path.resolve(__dirname, './../image.jpeg'))

  const file = {
    data: imageFile,
    mimetype: 'image/jpeg',
    name: 'image.jpeg',
    size: imageFile.length,
  }

  if (!imageTotalDocs) {
    console.log('seeding image...')
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
        equals: 'image.jpeg',
      },
    },
    limit: 1,
  })

  const image = imageDoc.docs[0]

  const { totalDocs: emailTemplateTotalDocs } = await payload.count({
    collection: 'email-templates',
  })

  if (!emailTemplateTotalDocs) {
    const emailTemplate = await payload.create({
      collection: 'email-templates',
      data: {
        name: 'Demo Email Template',
        description: 'This is a demo email template',
        subject: 'Hello from {{ name }}',
        title: 'Demo Email Template',
        fontFamily: ['Arial'],
        fallbackFontFamily: ['Helvetica', 'sans-serif'],
        body: [
          {
            blockType: 'container',
            style: {
              padding: '20px',
              margin: '0 auto',
              backgroundColor: '#eee',
            },
            content: [
              {
                blockType: 'section',
                style: {
                  backgroundColor: '#fff',
                },
                content: [
                  {
                    blockType: 'row',
                    style: {
                      backgroundColor: '#252f3d',
                      display: 'flex',
                      padding: '20px 0',
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                    columns: [
                      {
                        width: 'full',
                        align: 'center',
                        content: [
                          {
                            blockType: 'image',
                            image: image,
                            width: 100,
                            height: 100,
                            alt: 'Image',
                            align: 'center',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                blockType: 'section',
                style: { backgroundColor: '#fff' },
                content: [
                  {
                    blockType: 'row',
                    style: { padding: '25px 35px' },
                    columns: [
                      {
                        width: 'full',
                        content: [
                          {
                            blockType: 'heading',
                            content: 'Verify your email address',
                            level: 'h3',
                            // style: {
                            //   color: '#333',
                            //   fontFamily:
                            //     "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
                            //   fontSize: '20px',
                            //   fontWeight: 'bold',
                            //   marginBottom: '15px',
                            // },
                          },
                        ],
                      },
                    ],
                  },
                  {
                    blockType: 'row',
                    style: { padding: '25px 35px' },
                    columns: [
                      {
                        width: 'full',
                        align: 'left',
                        content: [
                          {
                            blockType: 'text',
                            text: "Thanks for starting the new AWS account creation process. We want to make sure it's really you. Please enter the following verification code when prompted. If you don't want to create an account, you can ignore this message.",
                            // style: {
                            //   color: '#333',
                            //   fontFamily:
                            //     "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
                            //   fontSize: '14px',
                            //   marginBottom: '14px',
                            // },
                          },
                        ],
                      },
                    ],
                  },
                  {
                    blockType: 'row',
                    style: { padding: '25px 35px' },
                    columns: [
                      {
                        width: 'full',
                        align: 'center',
                        content: [
                          {
                            blockType: 'text',
                            text: 'Verification code',
                            // style: {
                            //   color: '#333',
                            //   fontFamily:
                            //     "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
                            //   fontSize: '14px',
                            //   fontWeight: 'bold',
                            //   margin: 0,
                            //   textAlign: 'center',
                            // },
                          },
                        ],
                      },
                    ],
                  },
                  {
                    blockType: 'row',
                    style: { padding: '25px 35px' },
                    columns: [
                      {
                        width: 'full',
                        align: 'center',
                        content: [
                          {
                            blockType: 'text',
                            text: '{{verificationCode}}',
                            // style: {
                            //   color: '#333',
                            //   fontFamily:
                            //     "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
                            //   fontWeight: 'bold',
                            //   fontSize: '36px',
                            //   margin: '10px 0',
                            //   textAlign: 'center',
                            // },
                          },
                        ],
                      },
                    ],
                  },
                  {
                    blockType: 'row',
                    style: { padding: '25px 35px' },
                    columns: [
                      {
                        width: 'full',
                        align: 'center',
                        content: [
                          {
                            blockType: 'text',
                            text: '(This code is valid for 10 minutes)',
                            // style: {
                            //   color: '#333',
                            //   fontFamily:
                            //     "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
                            //   fontSize: '14px',
                            //   margin: 0,
                            //   textAlign: 'center',
                            // },
                          },
                        ],
                      },
                    ],
                  },

                  { blockType: 'hr' },
                  {
                    blockType: 'row',
                    style: { padding: '25px 35px' },
                    columns: [
                      {
                        width: 'full',
                        content: [
                          {
                            blockType: 'text',
                            text: 'Amazon Web Services will never email you and ask you to disclose or verify your password, credit card, or banking account number.',
                            // style: {
                            //   color: '#333',
                            //   fontFamily:
                            //     "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
                            //   fontSize: '14px',
                            //   margin: 0,
                            // },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                blockType: 'section',
                style: { backgroundColor: '#fff' },
                content: [
                  {
                    blockType: 'text',
                    text: 'This message was produced and distributed by Amazon Web Services, Inc., 410 Terry Ave. North, Seattle, WA 98109. © 2022, Amazon Web Services, Inc.. All rights reserved. AWS is a registered trademark of ',
                    // style: {
                    //   color: '#333',
                    //   fontFamily:
                    //     "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
                    //   fontSize: '12px',
                    //   padding: '0 20px',
                    // },
                  },
                  {
                    blockType: 'link',
                    url: 'https://amazon.com',
                    text: 'Amazon.com',
                    // style: {
                    //   color: '#2754C5',
                    //   fontSize: '14px',
                    //   textDecoration: 'underline',
                    // },
                  },
                  {
                    blockType: 'text',
                    text: ', Inc. View our ',
                  },
                  {
                    blockType: 'link',
                    url: 'https://amazon.com/privacy',
                    text: 'privacy policy',
                    // style: {
                    //   color: '#2754C5',
                    //   fontSize: '14px',
                    //   textDecoration: 'underline',
                    // },
                  },
                  {
                    blockType: 'text',
                    text: '.',
                  },
                ],
              },
            ],
          },
        ],
      },
    })

    return emailTemplate
  }
}
