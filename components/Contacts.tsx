import { playfair } from "@/app/fonts"
import { motion, useMotionValue } from "framer-motion"
import { type MouseEvent, ReactNode, useState, useRef } from "react"
import { twMerge } from "tailwind-merge"

type Ids = "default" | "tel" | "mail" | "adress"
const items: {
  id: Ids
  name: string
  href?: string
  className?: string
}[] = [
  { id: "tel", name: "+48 502 896 299", href: "tel:+48502896299" },
  { id: "mail", name: "braciabien@gmail.com", href: "tel:+48502896299" },
  {
    id: "adress",
    name: "Stawiszyńska 125, 62-800 Kalisz",
    href: "https://goo.gl/maps/BfMbTwFQTeVjVR717",
  },
]

type TItem = {
  active: Ids
  id: Ids
  children: ReactNode
  setActive: (id: Ids) => void
  href?: string
  className?: string
}

function Item({ id, active, href, setActive, children, className }: TItem) {
  const ref = useRef<HTMLAnchorElement>(null!)

  return (
    <a
      href={href}
      ref={ref}
      onMouseOver={() => setActive(id)}
      onMouseLeave={() => setActive("default")}
      className={twMerge(className, "relative p-2 rounded-lg z-10 w-fit")}
    >
      {active === id ? (
        <motion.div
          layoutId="contacts-bg"
          className="bg-blue-400 "
          style={{
            position: "absolute",
            zIndex: -10,
            inset: 0,
            borderRadius: 9999,
          }}
          transition={{ duration: 1 }}
        ></motion.div>
      ) : null}
      {children}
    </a>
  )
}

export default function Contacts() {
  const [active, setActive] = useState<Ids>("default")
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  function handleMouse(event: MouseEvent) {
    const rect = event.currentTarget.getBoundingClientRect()

    x.set(event.clientX - rect.left - 100 / 2)
    y.set(event.clientY - rect.top - 100 / 2)
  }
  return (
    <div
      className="flex justify-center relative overflow-hidden bg-red-500"
      onMouseMove={handleMouse}
    >
      {active === "default" ? (
        <motion.div
          layoutId="contacts-bg"
          className="bg-blue-400"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            x,
            y,
            width: 100,
            height: 100,
            borderRadius: 9999,
          }}
          transition={{ duration: 1, from: { x, y } }}
        ></motion.div>
      ) : null}
      <div className="max-w-fit m-auto flex flex-col gap-0">
        <h1 className={twMerge(playfair.className, "text-4xl font-bold z-10")}>
          Skontaktuj się
          <br /> z nami
        </h1>
        {items.map(({ name: name, ...i }) => (
          <Item key={name} {...i} active={active} setActive={setActive}>
            {name}
          </Item>
        ))}
      </div>
    </div>
  )
}
