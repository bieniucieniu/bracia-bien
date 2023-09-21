import { Url } from "next/dist/shared/lib/router/router"
import Link from "next/link"

export default function InLinkWrap({
  href,
  children,
}: {
  href?: Url | undefined | null
  children: React.ReactNode
}) {
  if (href) return <Link href={href}>{children}</Link>
  return children
}
