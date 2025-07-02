import { Link } from '@react-email/components'
import type { LinkBlock as LinkBlockType } from '../../types.js'

export const LinkBlock = ({ block }: { block: LinkBlockType }) => {
  const { url, target, text, color, underline } = block

  return (
    <Link
      href={url}
      target={target}
      style={{
        ...(color ? { color } : {}),
        textDecoration: underline ? 'underline' : 'none',
      }}
    >
      {text}
    </Link>
  )
}
