'use client'

import { ButtonBlock } from '../../blocks/Button/Component.js'
import { ContainerBlockClient } from '../../blocks/Container/ComponentClient.js'
import { HeadingBlock } from '../../blocks/Heading/Component.js'
import { HrBlock } from '../../blocks/Hr/Component.js'
import { ImageBlockClient } from '../../blocks/Image/ComponentClient.js'
import { LinkBlock } from '../../blocks/Link/Component.js'
import { RowBlockClient } from '../../blocks/Row/ComponentClient.js'
import { SectionBlockClient } from '../../blocks/Section/ComponentClient.js'
import { SpacerBlock } from '../../blocks/Spacer/Component.js'
import { EnvBlocksMap } from '../../types.js'

import { TextBlock } from '../../blocks/Text/Component.js'
import { createBlockRenderer } from './BlockRendererFactory.js'

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

export const BlockRendererClient = createBlockRenderer(clinetBlocks)
