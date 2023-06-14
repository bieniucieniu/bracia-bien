'use clinet'
import Image from 'next/image'
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { useEffect, useRef } from 'react';

const ImgPath = ['/images/slider/fotob-33.jpg', '/images/slider/fotob-39.jpg', '/images/slider/fotob-40.jpg']

export default function ImageSlider({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null!)

  return (
    <div className={className}>
      <ScrollArea.Root className="w-full h-full overflow-hidden">
        <ScrollArea.Viewport ref={ref} className="w-full h-full">
          <div className='flex flex-row'>
            {ImgPath.map((path) => (
              <div key={path} className='h-screen w-[240vh] relative'>
                <Image className='object-cover' src={path} alt={path} fill />
              </div>
            ))}
          </div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          orientation="horizontal"
        >
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </div>

  )
}
