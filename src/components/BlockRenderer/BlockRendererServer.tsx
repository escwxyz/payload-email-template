import { ButtonBlock } from '../../blocks/Button/Component.js'
import { ContainerBlockServer } from '../../blocks/Container/ComponentServer.js'
import { HeadingBlock } from '../../blocks/Heading/Component.js'
import { HrBlock } from '../../blocks/Hr/Component.js'
import { ImageBlockServer } from '../../blocks/Image/ComponentServer.js'
import { LinkBlock } from '../../blocks/Link/Component.js'
import { RowBlockServer } from '../../blocks/Row/ComponentServer.js'
import { SectionBlockServer } from '../../blocks/Section/ComponentServer.js'
import { SpacerBlock } from '../../blocks/Spacer/Component.js'
import { TextBlock } from '../../blocks/Text/Component.js'
import { EnvBlocksMap } from '../../types.js'
import { createBlockRenderer } from './BlockRendererFactory.js'

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

export const BlockRendererServer = createBlockRenderer(serverBlocks)
