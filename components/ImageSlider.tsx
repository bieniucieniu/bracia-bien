'use clinet'
import Image from 'next/image'
import { ScrollArea } from "@/components/ui/scroll-area"

export default function ImageSlider({ className }: { className?: string }) {
  return (
    <ScrollArea className={className} >
      <Image
        className='object-cover'
        width={1920}
        height={800}
        src="/fotob-33.jpg"
        alt="Picture of the author" />
      <Image
        className='object-cover'
        width={1920}
        height={800}
        src="/fotob-39.jpg"
        alt="Picture of the author" />
      <Image
        className='object-cover'
        width={1920}
        height={800}
        src="/fotob-40.jpg"
        alt="Picture of the author" />
    </ScrollArea>

  )
}
