import { ButtonBlock } from '../../blocks/Button/Component.js'
import { ContainerBlockServer } from '../../blocks/Container/ComponentServer.js'
import { HeadingBlockServer } from '../../blocks/Heading/ComponentServer.js'
import { HrBlock } from '../../blocks/Hr/Component.js'
import { ImageBlockServer } from '../../blocks/Image/ComponentServer.js'
import { LinkBlock } from '../../blocks/Link/Component.js'
import { MacroComponentServer } from '../../blocks/Macro/ComponentServer.js'
import { RowBlockServer } from '../../blocks/Row/ComponentServer.js'
import { SectionBlockServer } from '../../blocks/Section/ComponentServer.js'
import { SpacerBlock } from '../../blocks/Spacer/Component.js'
import { TextBlock } from '../../blocks/Text/Component.js'
import type { EnvBlocksMap } from '../../types.js'
import { createBlockRenderer } from './BlockRendererFactory.js'

const serverBlocks: EnvBlocksMap = {
  section: SectionBlockServer,
  container: ContainerBlockServer,
  row: RowBlockServer,
  image: ImageBlockServer,
  spacer: SpacerBlock,
  heading: HeadingBlockServer,
  hr: HrBlock,
  link: LinkBlock,
  text: TextBlock,
  button: ButtonBlock,
  macro: MacroComponentServer,
}

export const BlockRendererServer = createBlockRenderer(serverBlocks)
