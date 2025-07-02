import { SpacerBlock as SpacerBlockType } from '../../types.js'

export const SpacerBlock = ({ block }: { block: SpacerBlockType }) => {
  return <div style={{ height: block.height || '16px' }} />
}
