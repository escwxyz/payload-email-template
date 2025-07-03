// organize-imports-ignore
import React from 'react'
import { getPluginConfig } from '../store.js'
import type { Block, PreviewMode } from '../types.js'
import { ButtonBlock } from './Button/Component.js'
import { ContainerBlock } from './Container/Component.js'
import { HeadingBlock } from './Heading/Component.js'
import { HrBlock } from './Hr/Component.js'
import { ImageBlockServer } from './Image/Component.server.js'
import { LinkBlock } from './Link/Component.js'
import { RowBlock } from './Row/Component.js'
import { SectionBlock } from './Section/Component.js'
import { SpacerBlock } from './Spacer/Component.js'
import { TextBlock } from './Text/Component.js'

export type BlockRendererProps = {
  block: Block
  previewMode: PreviewMode
}

export const BlockRenderer = ({ block, previewMode }: BlockRendererProps) => {
  const imageCollectionSlug = getPluginConfig()?.imageCollectionSlug || 'media'

  switch (block.blockType) {
    case 'section': {
      return <SectionBlock key={block.id} block={block} previewMode={previewMode} />
    }

    case 'row': {
      return <RowBlock key={block.id} block={block} previewMode={previewMode} />
    }

    case 'heading': {
      return <HeadingBlock key={block.id} block={block} />
    }

    case 'spacer': {
      return <SpacerBlock key={block.id} block={block} />
    }

    case 'text': {
      return <TextBlock key={block.id} block={block} />
    }

    case 'button': {
      return <ButtonBlock key={block.id} block={block} />
    }

    case 'link': {
      return <LinkBlock key={block.id} block={block} />
    }

    case 'image': {
      if (previewMode === 'preview') {
        // NOTE: this fix the css error when run pnpm run dev:generate-types or importmap
        const ImageBlockClient = require('./Image/Component.client').ImageBlockClient

        return (
          <ImageBlockClient
            key={block.id}
            block={block}
            imageCollectionSlug={imageCollectionSlug}
          />
        )
      } else {
        return <ImageBlockServer key={block.id} block={block} />
      }
    }

    case 'hr': {
      return <HrBlock key={block.id} block={block} />
    }

    case 'container': {
      return <ContainerBlock key={block.id} block={block} previewMode={previewMode} />
    }

    default: {
      return null
    }
  }
}
