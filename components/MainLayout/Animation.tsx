"use client"
import { AnimatePresence, motion } from "framer-motion"

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  return <AnimatePresence>{children}</AnimatePresence>
}

export function AnimateContentMain({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={className}
    >
      {children}
    </motion.main>
  )
}
