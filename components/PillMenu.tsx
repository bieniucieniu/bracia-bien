"use client"
import { forwardRef, useId, createContext, useContext, useState } from "react"
import { twMerge } from "tailwind-merge"
import { motion } from "framer-motion"

type PillContext = {
  state: string
  setState: React.Dispatch<React.SetStateAction<string>>
  styleMotion: Parameters<typeof motion.div>[0]["style"]
  layoutId: string
}

const PillContext = createContext<PillContext | null>(null)

function usePillContext() {
  const context = useContext(PillContext)

  if (context === null) {
    throw new Error("MenuItem must be called in a child of Provider")
  }

  return context
}

const MenuRoot = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { styleMotion?: {} }
>(
  (
    { className, children, styleMotion = { backgroundColor: "red" }, ...props },
    ref
  ) => {
    const [state, setState] = useState<string>("")
    const layoutId = useId()
    return (
      <div
        ref={ref}
        {...props}
        className={twMerge("relative", className)}
        onMouseLeave={() => setState("")}
      >
        <PillContext.Provider
          value={{ state, setState, styleMotion, layoutId }}
        >
          {state === "" ? (
            <motion.div
              layoutId={layoutId}
              style={{
                position: "absolute",
                inset: -10,
                ...styleMotion,
              }}
              transition={{ duration: 0.3 }}
            ></motion.div>
          ) : null}
          {children}
        </PillContext.Provider>
      </div>
    )
  }
)

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  classNameMotion?: string
  styleMotion: Parameters<typeof motion.div>[0]["style"]
}

const MenuItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ className, children, styleMotion, ...props }, ref) => {
    const {
      state,
      setState,
      styleMotion: styleMotionRoot,
      layoutId,
    } = usePillContext()
    const id = useId()
    return (
      <div
        ref={ref}
        className={twMerge("relative", className)}
        onMouseOver={() => setState(id)}
        {...props}
      >
        {id === state ? (
          <motion.div
            layoutId={layoutId}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: -10,
              ...styleMotionRoot,
              ...styleMotion,
            }}
            transition={{ duration: 0.3 }}
          ></motion.div>
        ) : null}
        {children}
      </div>
    )
  }
)

export { MenuRoot, MenuItem }
