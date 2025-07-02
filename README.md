# Payload Email Template Plugin

A Payload CMS plugin to build email template based on React Email.

## Features

- Visual, block-based email template builder (no raw JSX required)
- Custom blocks: Heading, Button, Container, Image, Row, Section, Text, and more
- Preview: See your email as you build, with device and zoom controls
- Localization: Localize templates and content
- Macros: Use dynamic variables in subject and body (e.g., {{userName}})
- API endpoints: Expose an endpoint to generate both HTML and PlainText before sending your email

## Installation

To install the plugin, run one of the following commands:

```bash
pnpm add payload-email-template
# or
yarn add payload-email-template
# or
npm install payload-email-template
```

Then simply add it to your Payload config in the `plugins` array:

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
      macros: {
        companyName: 'Exampel Inc.',
        // ...add your default macros here
      },
      disableStyle: false, // (optional) allow custom style overrides, default: true
      // ...other options
    }),
  ],
})
```

## Plugin Options

| Option              | Type    | Default               | Description                                                                 |
| ------------------- | ------- | --------------------- | --------------------------------------------------------------------------- |
| enabled             | boolean | true                  | Enable/disable the plugin                                                   |
| imageCollectionSlug | string  | 'media'               | Collection slug for image uploads                                           |
| previewBreakpoints  | array   | see above             | Device preview sizes for the preview tab                                    |
| macros              | object  | {}                    | Default macros for template variables                                       |
| disableStyle        | boolean | false                 | Disable custom style overrides                                              |
| endpointAccess      | Access  | ({req}) => !!req.user | Default access control for the `/api/email-templates/:id/generate` endpoint |

## Usage

### Blocks

Config blocks (Heading, Button, Container, etc.) to build your template.
Each block has configurable fields (content, style, alignment, etc.).
Blocks can be nested for complex layouts.

### Macros

Use double curly braces to insert variables:
Example: Hello {{userName}}
Macros are replaced at render time using the values from your config or API call.

### Localization

If you enable localization in your Payload config, the plugin will automatically make text related tempalte fields localizable.

### Preview

The template could be previewed in the `Preview` tab. You can also use the controls to toggle mode, device and zoom.

## API Endpoints

### Generate Email Template

You may need to trigger rendering the email tempalte by sending a POST request to the following endpoint:

```
POST /api/email-templates/:id/generate
```

You will receive both `Html` and `PlainText` versions of the template.

```json
{
  "html": "<html>...</html>",
  "plainText": "..."
}
```

Then you could send it via your email provider.

## Contributing

Contributions are welcome! Please open issues or pull requests for bug fixes, features, or documentation improvements.

## License

[MIT](/LICENSE)
