// organize-imports-ignore
import React from 'react'
import type { ClientBlockComponent, ServerBlockComponent } from '../types.js'
import { ButtonBlock } from '../blocks/Button/Component.js'
import { ContainerBlockClient } from '../blocks/Container/ComponentClient.js'
import { ContainerBlockServer } from '../blocks/Container/ComponentServer.js'
import { HeadingBlock } from '../blocks/Heading/Component.js'
import { HrBlock } from '../blocks/Hr/Component.js'
import { ImageBlockClient } from '../blocks/Image/ComponentClient.js'
import { ImageBlockServer } from '../blocks/Image/ComponentServer.js'
import { LinkBlock } from '../blocks/Link/Component.js'
import { RowBlockClient } from '../blocks/Row/ComponentClient.js'
import { RowBlockServer } from '../blocks/Row/ComponentServer.js'
import { SectionBlockClient } from '../blocks/Section/ComponentClient.js'
import { SectionBlockServer } from '../blocks/Section/ComponentServer.js'
import { SpacerBlock } from '../blocks/Spacer/Component.js'
import { TextBlock } from '../blocks/Text/Component.js'

type EnvBlocksMap = {
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

const clinetBlocks: EnvBlocksMap = {
  section: SectionBlockClient,
  container: ContainerBlockClient,
  row: RowBlockClient,
  image: ImageBlockClient,
  spacer: SpacerBlock,
  heading: HeadingBlock,
  hr: HrBlock,
  link: LinkBlock,
  text: TextBlock,
  button: ButtonBlock,
}

const serverBlocks: EnvBlocksMap = {
  section: SectionBlockServer,
  container: ContainerBlockServer,
  row: RowBlockServer,
  image: ImageBlockServer,
  spacer: SpacerBlock,
  heading: HeadingBlock,
  hr: HrBlock,
  link: LinkBlock,
  text: TextBlock,
  button: ButtonBlock,
}

export function createBlockRenderer(envBlocks: EnvBlocksMap) {
  return function BlockRenderer(props: any) {
    const { block } = props
    const BlockComponent = envBlocks[block.blockType as keyof EnvBlocksMap]
    if (!BlockComponent) return <div>Unknown block type</div>
    return <BlockComponent {...props} />
  }
}

export const BlockRendererServer = createBlockRenderer(serverBlocks)
export const BlockRendererClient = createBlockRenderer(clinetBlocks)
