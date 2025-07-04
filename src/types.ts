import type {
  Access,
  DataFromCollectionSlug,
  LivePreviewConfig,
  UploadCollectionSlug,
} from 'payload'

export interface GenericBlock {
  blockType: string
  id?: string | null
  blockName?: string | null
  [key: string]: unknown
}

export interface LinkBlock extends GenericBlock {
  blockType: 'link'
  text: string
  url: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  color?: string
  underline?: boolean
  style?: React.CSSProperties
}

export interface SpacerBlock extends GenericBlock {
  height?: ('8px' | '16px' | '24px' | '32px' | '48px' | '64px') | null
  blockType: 'spacer'
}

export interface HeadingBlock extends GenericBlock {
  blockType: 'heading'
  content: string
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  textAlign?: 'left' | 'center' | 'right'
  style?: React.CSSProperties
}

export interface PlainTextBlock extends GenericBlock {
  blockType: 'plainText'
  content: string
}

export interface TextBlock extends GenericBlock {
  content: (PlainTextBlock | LinkBlock)[]
  fontSize?: '0.75rem' | '0.875rem' | '1rem' | '1.125rem' | '1.25rem'
  textAlign?: 'left' | 'center' | 'right'
  color?: string | null
  lineHeight?: '1.2' | '1.4' | '1.6' | '1.8'
  style?: React.CSSProperties
  blockType: 'text'
}

export interface ButtonBlock extends GenericBlock {
  blockType: 'button'
  text: string
  style?: React.CSSProperties
  url: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  variant?: 'primary' | 'secondary' | 'outline' | null
  textColor?: string | null
  backgroundColor?: string | null
  borderRadius?: '0px' | '4px' | '8px' | '16px' | '999px' | null
  padding?: '8px 16px' | '12px 24px' | '16px 32px' | null
  horizontalAlign?: 'left' | 'center' | 'right' | null
  verticalAlign?: 'top' | 'center' | 'bottom' | null
}

export interface SectionBlock extends GenericBlock {
  blockType: 'section'
  backgroundColor?: string | null
  padding?: '0' | '16px' | '32px' | '48px' | null
  content: Block[]
  style?: React.CSSProperties
}

export interface RowBlock extends GenericBlock {
  blockType: 'row'
  columns: {
    id?: string | null
    content: Block[]
    width?: '1/4' | '1/3' | '1/2' | '2/3' | '3/4' | 'full' | null
    align?: 'left' | 'center' | 'right' | null
    verticalAlign?: 'top' | 'center' | 'bottom' | null
    style?: React.CSSProperties
  }[]
  style?: React.CSSProperties
}

export interface ImageBlock<T extends UploadCollectionSlug = 'media'> extends GenericBlock {
  blockType: 'image'
  image: string | DataFromCollectionSlug<T>
  alt?: string
  width?: number | null
  height?: number | null
  objectFit?: 'cover' | 'contain' | null
  align?: 'left' | 'center' | 'right' | null
  style?: React.CSSProperties
}

export interface HrBlock extends GenericBlock {
  blockType: 'hr'
  color?: string
  thickness?: '1px' | '2px' | '3px'
  margin?: '16px 0' | '32px 0' | '48px 0'
  style?: React.CSSProperties
}

export interface ContainerBlock extends GenericBlock {
  blockType: 'container'
  // backgroundColor?: string | null
  // padding?: '0' | '16px' | '32px' | '48px' | null
  content: Block[]
  style?: React.CSSProperties
}

export type Block =
  | HeadingBlock
  | TextBlock
  | ButtonBlock
  | SectionBlock
  | SpacerBlock
  | RowBlock
  | LinkBlock
  | ImageBlock
  | HrBlock
  | ContainerBlock

export type FallbackFont =
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

export type FontFormat = 'woff' | 'woff2' | 'truetype' | 'opentype' | 'embedded-opentype' | 'svg'

export type PluginOptions = {
  disabled?: boolean
  /**
   * The collection slug to use for the image field.
   * @default 'media'
   */
  imageCollectionSlug?: UploadCollectionSlug
  /**
   * Preview config for the email templates collection.
   * @default
   * - Mobile: 375 x 667
   * - Desktop: 1024 x 1366
   */
  previewBreakpoints?: Omit<LivePreviewConfig, 'url'>['breakpoints']
  // TODO: add macros
  // /**
  //  * Macros to inject into the email template
  //  * Example: { name: "John" }
  //  * The email template will be rendered eg. from "Hello {{name}}" to "Hello John"
  //  */
  // macros?: Record<string, string>
  /**
   * Disable the style field in the email template
   * @default false
   */
  disableStyle?: boolean

  /**
   * Access control for the generate endpoint.
   * @default ({req}) => !!req.user
   */
  endpointAccess?: Access
  // TODO: allow user to override
  // collectionConfig?: Omit<CollectionConfig<'email-templates'>, 'slug' | 'fields' | 'endpoints'>
}

export type BlockRendererServerProps = {
  block: Block
  previewMode: 'preview' | 'render'
}

export type BlockRendererClientProps = {
  imageCollectionSlug: UploadCollectionSlug
} & BlockRendererServerProps

export type ServerBlockComponent = React.ComponentType<BlockRendererServerProps>

export type ClientBlockComponent = React.ComponentType<BlockRendererClientProps>

export type EnvBlocksMap = {
  section: ServerBlockComponent | ClientBlockComponent
  container: ServerBlockComponent | ClientBlockComponent
  row: ServerBlockComponent | ClientBlockComponent
  image: ServerBlockComponent | ClientBlockComponent
  spacer: ServerBlockComponent
  heading: ServerBlockComponent
  hr: ServerBlockComponent
  link: ServerBlockComponent
  text: ServerBlockComponent
  button: ServerBlockComponent
}
