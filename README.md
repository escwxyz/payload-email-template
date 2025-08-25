# Payload Email Template Plugin 🚀

[![npm version](https://img.shields.io/npm/v/payload-email-template.svg?style=flat-square)](https://www.npmjs.com/package/payload-email-template)
[![npm downloads](https://img.shields.io/npm/dm/payload-email-template.svg?style=flat-square)](https://www.npmjs.com/package/payload-email-template)
[![MIT License](https://img.shields.io/badge/license-MIT-green.svg?style=flat-square)](LICENSE)

---

A powerful, visual, and block-based email template builder plugin for [Payload CMS](https://payloadcms.com/) — built on top of [React Email](https://react.email/). Design beautiful, dynamic, and localized email templates with ease! ✨

---

## ✨ Features

- 🧩 **Visual, block-based email template builder** (no raw JSX required)
- 🏗️ **Custom blocks:** Heading, Button, Container, Image, Row, Section, Text, and more
- 🔧 **Dynamic macros:** Variables, functions, dates, conditions, loops, and config values
- 👀 **Preview:** See your email as you build, with device and zoom controls
- 🌍 **Localization:** Localize templates and content
- 🔌 **API endpoints:** Generate both HTML and PlainText before sending your email

---

## 📦 Installation

```bash
pnpm add payload-email-template
# or
yarn add payload-email-template
# or
npm install payload-email-template
```

---

## 🚀 Getting Started

Add the plugin to your Payload config in the `plugins` array:

```ts
import { emailTemplatePlugin } from 'payload-email-template'

export default buildConfig({
  // ...other config
  plugins: [
    emailTemplatePlugin({
      enabled: true,
      imageCollectionSlug: 'media', // (optional) collection for image uploads
      previewBreakpoints: [
        // (optional) default breakpoints
        { name: 'mobile', label: 'Mobile', width: 375, height: 667 },
        { name: 'desktop', label: 'Desktop', width: 1440, height: 900 },
      ],
      disableStyle: false, // (optional) allow custom style overrides, default: false
      macros: {
        // (optional) dynamic content for variables, functions, and config
        variables: {
          companyName: 'Your Company',
          user: { firstName: 'John', lastName: 'Doe' },
        },
        functions: {
          greet: (name) => `Hello, ${name}!`,
          formatPrice: (price) => `$${price.toFixed(2)}`,
        },
        config: {
          appName: 'My App',
          version: '1.0.0',
        },
      },
      // ...other options
    }),
  ],
})
```

---

## 🖼️ Demo

![Demo 1](/assets/demo-1.png)

![Demo 2](/assets/demo-2.png)

---

## ⚙️ Plugin Options

| Option                | Type    | Default                                  | Description                                                                 |
| --------------------- | ------- | ---------------------------------------- | --------------------------------------------------------------------------- |
| `enabled`             | boolean | `true`                                   | Enable/disable the plugin                                                   |
| `imageCollectionSlug` | string  | `'media'`                                | Collection slug for image uploads                                           |
| `previewBreakpoints`  | array   | see example                              | Device preview sizes for the preview tab                                    |
| `disableStyle`        | boolean | `false`                                  | Disable custom style overrides                                              |
| `macros`              | object  | `{}`                                     | Dynamic content configuration (variables, functions, config)                |
| `endpointAccess`      | Access  | `({req}) => Boolean(req.user)`           | Default access control for the `/api/email-templates/:id/generate` endpoint |
| `collectionAccess`    | Access  | `{ read: ({req}) => Boolean(req.user) }` | Default access control for `email-templates` collection                     |

---

## 🛠️ Usage

### 🧱 Blocks

Configure blocks (Heading, Button, Container, etc.) to build your template. Each block has configurable fields (content, style, alignment, etc.). Blocks can be nested for complex layouts.

### 🌍 Localization

If you enable localization in your Payload config, the plugin will automatically make text-related template fields localizable.

### 👀 Preview

The template can be previewed in the `Preview` tab. You can also use the controls to toggle mode, device, and zoom.

---

## 🔌 API Endpoints

### Generate Email Template

You can trigger rendering the email template by sending a POST request to the following endpoint:

```
POST /api/email-templates/:id/generate
```

You will receive both `html` and `plainText` versions of the template:

```json
{
  "html": "<html>...</html>",
  "plainText": "..."
}
```

Then you can send it via your email provider.

---

## ⚙ Local Api

### Generate Email Template

It's also possible to render the email template by calling `renderEmailTemplate` directly in the back-end, skipping the http request in that case.

```js
import { renderEmailTemplate } from "payload-email-template"

// const emailTemplate = await req.payload.find({
//   collection: 'email-templates',
//   ...
// })

const html = renderEmailTemplate({
  data: emailTemplate,
  locale: 'en',
  format: 'html',
  macroContext: {
    companyName: 'Acme Corporation'
    // ...
  }
})

```

---

## 🔧 Macros

The plugin supports powerful dynamic content through macros that can be used in email subjects, headings, and text blocks.

### Macro Types

#### 1. **Variables** - `{{variableName}}`

Access data from your macro configuration:

```
{{companyName}} → "Acme Corporation"
{{user.firstName}} → "John"
```

#### 2. **Config Values** - `{{@config('key')}}`

Access plugin configuration values:

```
{{@config('appName')}} → "My Awesome App"
{{@config('version')}} → "1.0.0"
```

#### 3. **Date Functions** - `{{@date('format')}}`

Format current date and time:

```
{{@date('YYYY-MM-DD')}} → "2024-01-15"
{{@date('MMMM Do, YYYY')}} → "January 15th, 2024"
```

#### 4. **Functions** (Server-side only)

Transform data with custom functions:

```
{{@uppercase('hello')}} → "HELLO"
{{@greet('John')}} → "Hello, John!" (if configured)
```

#### 5. **Conditional Content**

Show content based on conditions:

- Set up conditions in the macro block interface
- Define content for true/false scenarios
- Useful for personalized content

#### 6. **Loops**

Repeat content for data collections:

- Configure collection data source
- Define template for each item
- Great for product lists, etc.

### Usage Locations

**✅ Email Subjects**: `"Welcome to {{companyName}}, {{user.firstName}}!"`

**✅ Heading Blocks**: Mix text, links, and macros in headings

**✅ Text Blocks**: Inline macros alongside regular text and links

**✅ Macro Blocks**: Dedicated blocks for complex conditions and loops

### Runtime Context

You can also pass runtime macro context when generating emails:

```ts
// POST /api/email-templates/:id/generate
{
  "macroContext": {
    "variables": {
      "user": { "firstName": "Jane" },
      "orderTotal": "$99.99"
    }
  }
}
```

Runtime context takes precedence over plugin configuration.

---

## 🤝 Contributing

Contributions are welcome! Please open issues or pull requests for bug fixes, features, or documentation improvements.

---

## 📄 License

[MIT](/LICENSE)
