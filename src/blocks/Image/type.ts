import { UploadCollectionSlug } from 'payload'

export interface ReactEmailImageBlock {
  image: string | UploadCollectionSlug
  alt: string
  /**
   * Width in pixels, leave empty for auto
   */
  width?: number | null
  /**
   * Height in pixels, leave empty for auto
   */
  height?: number | null
  align?: ('left' | 'center' | 'right') | null
  /**
   * Additional custom style object to override the default styles, e.g. { "color": "#333" }
   */
  style?:
    | {
        [k: string]: unknown
      }
    | unknown[]
    | string
    | number
    | boolean
    | null
  id?: string | null
  blockName?: string | null
  blockType: 'image'
}
