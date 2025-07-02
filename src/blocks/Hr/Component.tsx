import { Hr } from '@react-email/components'
import type { HrBlock as HrBlockType } from '../../types.js'

export const HrBlock = ({ block }: { block: HrBlockType }) => {
  const { color, thickness, margin, style } = block

  return <Hr style={{ borderColor: color, borderWidth: thickness, margin, ...style }} />
}
