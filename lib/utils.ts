import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const toPlObj = {
  gallery: "galleria",
  main: "główne",
  current: "aktualne",
  else: "inne",
}

export function toPl(value: keyof typeof toPlObj | undefined | null) {
  if (!value) return null
  return toPlObj[value]
}
