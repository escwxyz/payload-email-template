import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { MongoMemoryReplSet } from 'mongodb-memory-server'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildConfig } from 'payload'
import { emailTemplatePlugin } from 'payload-email-template'
import sharp from 'sharp'

import { seedEmailTemplates } from './helpers/seedEmailTemplates.js'
import { testEmailAdapter } from './helpers/testEmailAdapter.js'
import { seed } from './seed.js'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

if (!process.env.ROOT_DIR) {
  process.env.ROOT_DIR = dirname
}

const buildConfigWithMemoryDB = async () => {
  if (process.env.CI === 'true') {
    const memoryDB = await MongoMemoryReplSet.create({
      replSet: {
        count: 3,
        dbName: 'payloadmemory',
      },
    })

    await memoryDB.waitUntilRunning()

    process.env.DATABASE_URI = `${memoryDB.getUri()}&retryWrites=true`
  }

  return buildConfig({
    admin: {
      importMap: {
        baseDir: path.resolve(dirname),
      },
    },
    collections: [
      {
        slug: 'media',
        fields: [],
        upload: {
          staticDir: path.resolve(dirname, 'media'),
        },
      },
    ],
    db: mongooseAdapter({
      ensureIndexes: true,
      url: process.env.DATABASE_URI || 'mongodb://127.0.0.1:27017/payload-email-template-test',
    }),
    editor: lexicalEditor(),
    email: testEmailAdapter,
    onInit: async (payload) => {
      await seed(payload)
      await seedEmailTemplates(payload)
    },
    localization: {
      locales: ['en', 'zh'],
      defaultLocale: 'en',
    },
    plugins: [
      emailTemplatePlugin({
        imageCollectionSlug: 'media',
        macros: {
          variables: {
            companyName: 'Acme Corporation',
            supportEmail: 'support@acme.com',
            year: '2024',
            user: {
              firstName: 'John',
              lastName: 'Doe',
              email: 'john.doe@example.com',
            },
          },
          functions: {
            greet: (name: string) => `Hello, ${name}!`,
            formatPrice: (price: number) => `$${price.toFixed(2)}`,
          },
          config: {
            appName: 'My Awesome App',
            version: '1.0.0',
            theme: 'modern',
          },
        },
      }),
    ],
    secret: process.env.PAYLOAD_SECRET || 'test-secret_key',
    sharp,
    typescript: {
      outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
  })
}

export default buildConfigWithMemoryDB()
