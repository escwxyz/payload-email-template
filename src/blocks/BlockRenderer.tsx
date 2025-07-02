import type { Block } from '../types.js'
import { ButtonBlock } from './Button/Component.js'
import { ContainerBlock } from './Container/Component.js'
import { HeadingBlock } from './Heading/Component.js'
import { HrBlock } from './Hr/Component.js'
import { ImageBlock } from './Image/Component.js'
import { LinkBlock } from './Link/Component.js'
import { RowBlock } from './Row/Component.js'
import { SectionBlock } from './Section/Component.js'
import { SpacerBlock } from './Spacer/Component.js'
import { TextBlock } from './Text/Component.js'

export const BlockRenderer = ({ block }: { block: Block }) => {
  switch (block.blockType) {
    case 'section': {
      return <SectionBlock key={block.id} block={block} />
    }

    case 'row': {
      return <RowBlock key={block.id} block={block} />
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
      return <ImageBlock key={block.id} block={block} />
    }

    case 'hr': {
      return <HrBlock key={block.id} block={block} />
    }

    case 'container': {
      return <ContainerBlock key={block.id} block={block} />
    }

    default: {
      return null
    }
  }
}
