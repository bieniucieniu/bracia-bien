"use client"
import Image from "next/image"
import { useEffect, useState } from "react"
import Slider from "../Slider"

export default function Banner({ urls }: { urls: string[] }) {
  const [visible, setVisible] = useState<boolean>(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 3000)
  }, [urls])

  return (
    <>
      <div
        onClick={() => setVisible(true)}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Image
          src="/logo.png"
          priority
          className={"object-contain transition-opacity m-auto"}
          alt="logo"
          width={638}
          height={189}
        />
      </div>
      {visible && urls.length > 0 ? (
        <Slider
          autoSlide={10000}
          className="z-10"
          renderer={(i) => (
            <Image alt={`image-${i}`} src={urls[i]} width={1920} height={800} />
          )}
          length={urls.length}
        />
      ) : null}
    </>
  )
}
