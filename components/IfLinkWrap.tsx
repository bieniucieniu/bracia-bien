import { Url } from "next/dist/shared/lib/router/router"
import Link from "next/link"

type Props = Omit<Parameters<typeof Link>[0], "href"> & {
  href?: Url | undefined | null
}
export default function IfLinkWrap({ href, children, ...props }: Props) {
  if (href)
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    )
  return children
}
