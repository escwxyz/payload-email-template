/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

/**
 * Supported timezones in IANA format.
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "supportedTimezones".
 */
export type SupportedTimezones =
  | 'Pacific/Midway'
  | 'Pacific/Niue'
  | 'Pacific/Honolulu'
  | 'Pacific/Rarotonga'
  | 'America/Anchorage'
  | 'Pacific/Gambier'
  | 'America/Los_Angeles'
  | 'America/Tijuana'
  | 'America/Denver'
  | 'America/Phoenix'
  | 'America/Chicago'
  | 'America/Guatemala'
  | 'America/New_York'
  | 'America/Bogota'
  | 'America/Caracas'
  | 'America/Santiago'
  | 'America/Buenos_Aires'
  | 'America/Sao_Paulo'
  | 'Atlantic/South_Georgia'
  | 'Atlantic/Azores'
  | 'Atlantic/Cape_Verde'
  | 'Europe/London'
  | 'Europe/Berlin'
  | 'Africa/Lagos'
  | 'Europe/Athens'
  | 'Africa/Cairo'
  | 'Europe/Moscow'
  | 'Asia/Riyadh'
  | 'Asia/Dubai'
  | 'Asia/Baku'
  | 'Asia/Karachi'
  | 'Asia/Tashkent'
  | 'Asia/Calcutta'
  | 'Asia/Dhaka'
  | 'Asia/Almaty'
  | 'Asia/Jakarta'
  | 'Asia/Bangkok'
  | 'Asia/Shanghai'
  | 'Asia/Singapore'
  | 'Asia/Tokyo'
  | 'Asia/Seoul'
  | 'Australia/Brisbane'
  | 'Australia/Sydney'
  | 'Pacific/Guam'
  | 'Pacific/Noumea'
  | 'Pacific/Auckland'
  | 'Pacific/Fiji';

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  blocks: {};
  collections: {
    media: Media;
    'email-templates': EmailTemplate;
    users: User;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {};
  collectionsSelect: {
    media: MediaSelect<false> | MediaSelect<true>;
    'email-templates': EmailTemplatesSelect<false> | EmailTemplatesSelect<true>;
    users: UsersSelect<false> | UsersSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: string;
  };
  globals: {};
  globalsSelect: {};
  locale: 'en' | 'zh';
  user: User & {
    collection: 'users';
  };
  jobs: {
    tasks: unknown;
    workflows: unknown;
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: string;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "email-templates".
 */
export interface EmailTemplate {
  id: string;
  name: string;
  description?: string | null;
  subject: string;
  title?: string | null;
  /**
   * Please input only one font family here.
   */
  fontFamily: string[];
  fallbackFontFamily: (
    | 'Arial'
    | 'Helvetica'
    | 'Verdana'
    | 'Georgia'
    | 'Times New Roman'
    | 'serif'
    | 'sans-serif'
    | 'monospace'
    | 'cursive'
    | 'fantasy'
  )[];
  webFont?: {
    url?: string | null;
    format?: ('woff' | 'woff2' | 'truetype' | 'opentype' | 'embedded-opentype' | 'svg') | null;
  };
  fontWeight?: string | null;
  fontStyle?: string | null;
  /**
   * The body of the email template. Related to the main content.
   */
  body?: ReactEmailContainerBlock[] | null;
  /**
   * Additional custom style object to override the default styles, e.g. { "backgroundColor": "#333" }
   */
  style?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ReactEmailContainerBlock".
 */
export interface ReactEmailContainerBlock {
  content?:
    | (
        | ReactEmailSectionBlock
        | ReactEmailRowBlock
        | ReactEmailHeadingBlock
        | ReactEmailButtonBlock
        | ReactEmailHrBlock
        | ReactEmailImageBlock
        | ReactEmailTextBlock
        | ReactEmailLinkBlock
        | ReactEmailSpacerBlock
      )[]
    | null;
  /**
   * Additional custom style object to override the default styles, e.g. { "backgroundColor": "#333" }
   */
  style?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'container';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ReactEmailSectionBlock".
 */
export interface ReactEmailSectionBlock {
  content?:
    | (
        | ReactEmailRowBlock
        | ReactEmailHeadingBlock
        | ReactEmailImageBlock
        | ReactEmailButtonBlock
        | ReactEmailTextBlock
        | ReactEmailLinkBlock
        | ReactEmailHrBlock
        | ReactEmailSpacerBlock
      )[]
    | null;
  /**
   * CSS color value (e.g., #ffffff, rgba(255,255,255,0.9))
   */
  backgroundColor?: string | null;
  padding?: ('0' | '16px' | '32px' | '48px') | null;
  /**
   * Additional custom style object to override the default styles, e.g. { "backgroundColor": "#333" }
   */
  style?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'section';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ReactEmailRowBlock".
 */
export interface ReactEmailRowBlock {
  columns?:
    | {
        content?:
          | (
              | ReactEmailTextBlock
              | ReactEmailButtonBlock
              | ReactEmailHeadingBlock
              | ReactEmailImageBlock
              | ReactEmailLinkBlock
              | ReactEmailSpacerBlock
            )[]
          | null;
        width?: ('1/4' | '1/3' | '1/2' | '2/3' | '3/4' | 'full') | null;
        align?: ('left' | 'center' | 'right') | null;
        verticalAlign?: ('top' | 'middle' | 'bottom') | null;
        /**
         * Additional custom style object to override the default styles, e.g. { "backgroundColor": "#333" }
         */
        style?:
          | {
              [k: string]: unknown;
            }
          | unknown[]
          | string
          | number
          | boolean
          | null;
        id?: string | null;
      }[]
    | null;
  /**
   * Additional custom style object to override the default styles, e.g. { "backgroundColor": "#333" }
   */
  style?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'row';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ReactEmailTextBlock".
 */
export interface ReactEmailTextBlock {
  content: (ReactEmailLinkBlock | ReactEmailPlainTextBlock | ReactEmailMacroBlock)[];
  fontSize?: ('0.75rem' | '0.875rem' | '1rem' | '1.125rem' | '1.25rem') | null;
  textAlign?: ('left' | 'center' | 'right') | null;
  color?: string | null;
  lineHeight?: ('1.2' | '1.4' | '1.6' | '1.8') | null;
  /**
   * Additional custom style object to override the default styles, e.g. { "backgroundColor": "#333" }
   */
  style?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'text';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ReactEmailLinkBlock".
 */
export interface ReactEmailLinkBlock {
  text: string;
  url: string;
  target?: ('_self' | '_blank') | null;
  color?: string | null;
  underline?: boolean | null;
  /**
   * Additional custom style object to override the default styles, e.g. { "backgroundColor": "#333" }
   */
  style?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'link';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ReactEmailPlainTextBlock".
 */
export interface ReactEmailPlainTextBlock {
  content: string;
  id?: string | null;
  blockName?: string | null;
  blockType: 'plainText';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ReactEmailMacroBlock".
 */
export interface ReactEmailMacroBlock {
  macroType: 'variable' | 'date' | 'config' | 'function' | 'condition' | 'loop';
  /**
   * Template content with macro syntax (e.g., "Hello {{ name }}")
   */
  content?: string | null;
  variableName?: string | null;
  defaultValue?: string | null;
  dateFormat?: ('YYYY-MM-DD' | 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'DD.MM.YYYY' | 'long' | 'short') | null;
  /**
   * Key from plugin configuration to display
   */
  configKey?: string | null;
  functionName?: string | null;
  functionArgs?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  /**
   * Condition to evaluate (e.g., "userType === admin")
   */
  condition?: string | null;
  trueContent?: unknown[] | null;
  falseContent?: unknown[] | null;
  /**
   * Path to array data (e.g., "items" or "user.orders")
   */
  arrayPath?: string | null;
  itemTemplate?: unknown[] | null;
  /**
   * Override global variables for this macro
   */
  localVariables?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  /**
   * Additional custom style object to override the default styles, e.g. { "backgroundColor": "#333" }
   */
  style?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'macro';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ReactEmailButtonBlock".
 */
export interface ReactEmailButtonBlock {
  text: string;
  url: string;
  target?: ('_self' | '_blank') | null;
  variant?: ('primary' | 'secondary' | 'outline') | null;
  backgroundColor?: string | null;
  textColor?: string | null;
  borderRadius?: ('0px' | '4px' | '8px' | '16px' | '999px') | null;
  padding?: ('8px 16px' | '12px 24px' | '16px 32px') | null;
  align?: ('left' | 'center' | 'right') | null;
  /**
   * Additional custom style object to override the default styles, e.g. { "backgroundColor": "#333" }
   */
  style?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'button';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ReactEmailHeadingBlock".
 */
export interface ReactEmailHeadingBlock {
  content: string;
  level?: ('h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') | null;
  textAlign?: ('left' | 'center' | 'right') | null;
  /**
   * Additional custom style object to override the default styles, e.g. { "backgroundColor": "#333" }
   */
  style?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'heading';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ReactEmailImageBlock".
 */
export interface ReactEmailImageBlock {
  /**
   * The image to display in the email template.
   */
  image?: (string | null) | Media;
  alt?: string | null;
  /**
   * Width in pixels, leave empty for auto
   */
  width?: number | null;
  /**
   * Height in pixels, leave empty for auto
   */
  height?: number | null;
  objectFit?: ('cover' | 'contain') | null;
  align?: ('left' | 'center' | 'right') | null;
  /**
   * Additional custom style object to override the default styles, e.g. { "backgroundColor": "#333" }
   */
  style?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'image';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ReactEmailSpacerBlock".
 */
export interface ReactEmailSpacerBlock {
  height?: ('8px' | '16px' | '24px' | '32px' | '48px' | '64px') | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'spacer';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ReactEmailHrBlock".
 */
export interface ReactEmailHrBlock {
  color?: string | null;
  thickness?: ('1px' | '2px' | '3px') | null;
  margin?: ('16px 0' | '32px 0' | '48px 0') | null;
  /**
   * Additional custom style object to override the default styles, e.g. { "backgroundColor": "#333" }
   */
  style?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'hr';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  sessions?:
    | {
        id: string;
        createdAt?: string | null;
        expiresAt: string;
      }[]
    | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: string;
  document?:
    | ({
        relationTo: 'media';
        value: string | Media;
      } | null)
    | ({
        relationTo: 'email-templates';
        value: string | EmailTemplate;
      } | null)
    | ({
        relationTo: 'users';
        value: string | User;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media_select".
 */
export interface MediaSelect<T extends boolean = true> {
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "email-templates_select".
 */
export interface EmailTemplatesSelect<T extends boolean = true> {
  name?: T;
  description?: T;
  subject?: T;
  title?: T;
  fontFamily?: T;
  fallbackFontFamily?: T;
  webFont?:
    | T
    | {
        url?: T;
        format?: T;
      };
  fontWeight?: T;
  fontStyle?: T;
  body?:
    | T
    | {
        container?: T | ReactEmailContainerBlockSelect<T>;
      };
  style?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ReactEmailContainerBlock_select".
 */
export interface ReactEmailContainerBlockSelect<T extends boolean = true> {
  content?:
    | T
    | {
        section?: T | ReactEmailSectionBlockSelect<T>;
        row?: T | ReactEmailRowBlockSelect<T>;
        heading?: T | ReactEmailHeadingBlockSelect<T>;
        button?: T | ReactEmailButtonBlockSelect<T>;
        hr?: T | ReactEmailHrBlockSelect<T>;
        image?: T | ReactEmailImageBlockSelect<T>;
        text?: T | ReactEmailTextBlockSelect<T>;
        link?: T | ReactEmailLinkBlockSelect<T>;
        spacer?: T | ReactEmailSpacerBlockSelect<T>;
      };
  style?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ReactEmailSectionBlock_select".
 */
export interface ReactEmailSectionBlockSelect<T extends boolean = true> {
  content?:
    | T
    | {
        row?: T | ReactEmailRowBlockSelect<T>;
        heading?: T | ReactEmailHeadingBlockSelect<T>;
        image?: T | ReactEmailImageBlockSelect<T>;
        button?: T | ReactEmailButtonBlockSelect<T>;
        text?: T | ReactEmailTextBlockSelect<T>;
        link?: T | ReactEmailLinkBlockSelect<T>;
        hr?: T | ReactEmailHrBlockSelect<T>;
        spacer?: T | ReactEmailSpacerBlockSelect<T>;
      };
  backgroundColor?: T;
  padding?: T;
  style?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ReactEmailRowBlock_select".
 */
export interface ReactEmailRowBlockSelect<T extends boolean = true> {
  columns?:
    | T
    | {
        content?:
          | T
          | {
              text?: T | ReactEmailTextBlockSelect<T>;
              button?: T | ReactEmailButtonBlockSelect<T>;
              heading?: T | ReactEmailHeadingBlockSelect<T>;
              image?: T | ReactEmailImageBlockSelect<T>;
              link?: T | ReactEmailLinkBlockSelect<T>;
              spacer?: T | ReactEmailSpacerBlockSelect<T>;
            };
        width?: T;
        align?: T;
        verticalAlign?: T;
        style?: T;
        id?: T;
      };
  style?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ReactEmailTextBlock_select".
 */
export interface ReactEmailTextBlockSelect<T extends boolean = true> {
  content?:
    | T
    | {
        link?: T | ReactEmailLinkBlockSelect<T>;
        plainText?: T | ReactEmailPlainTextBlockSelect<T>;
        macro?: T | ReactEmailMacroBlockSelect<T>;
      };
  fontSize?: T;
  textAlign?: T;
  color?: T;
  lineHeight?: T;
  style?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ReactEmailLinkBlock_select".
 */
export interface ReactEmailLinkBlockSelect<T extends boolean = true> {
  text?: T;
  url?: T;
  target?: T;
  color?: T;
  underline?: T;
  style?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ReactEmailPlainTextBlock_select".
 */
export interface ReactEmailPlainTextBlockSelect<T extends boolean = true> {
  content?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ReactEmailMacroBlock_select".
 */
export interface ReactEmailMacroBlockSelect<T extends boolean = true> {
  macroType?: T;
  content?: T;
  variableName?: T;
  defaultValue?: T;
  dateFormat?: T;
  configKey?: T;
  functionName?: T;
  functionArgs?: T;
  condition?: T;
  trueContent?: T | {};
  falseContent?: T | {};
  arrayPath?: T;
  itemTemplate?: T | {};
  localVariables?: T;
  style?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ReactEmailButtonBlock_select".
 */
export interface ReactEmailButtonBlockSelect<T extends boolean = true> {
  text?: T;
  url?: T;
  target?: T;
  variant?: T;
  backgroundColor?: T;
  textColor?: T;
  borderRadius?: T;
  padding?: T;
  align?: T;
  style?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ReactEmailHeadingBlock_select".
 */
export interface ReactEmailHeadingBlockSelect<T extends boolean = true> {
  content?: T;
  level?: T;
  textAlign?: T;
  style?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ReactEmailImageBlock_select".
 */
export interface ReactEmailImageBlockSelect<T extends boolean = true> {
  image?: T;
  alt?: T;
  width?: T;
  height?: T;
  objectFit?: T;
  align?: T;
  style?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ReactEmailSpacerBlock_select".
 */
export interface ReactEmailSpacerBlockSelect<T extends boolean = true> {
  height?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ReactEmailHrBlock_select".
 */
export interface ReactEmailHrBlockSelect<T extends boolean = true> {
  color?: T;
  thickness?: T;
  margin?: T;
  style?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
  sessions?:
    | T
    | {
        id?: T;
        createdAt?: T;
        expiresAt?: T;
      };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}