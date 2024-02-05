"use client"
import Image from "next/image"
import { useAdminContext } from "./AdminContext"
import { Button } from "../ui/button"
import { useState } from "react"

export default function Deleter() {
  const [toDelete, setToDelete] = useState<string[]>([])
  const [success, setSuccess] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [pending, setPending] = useState<boolean>(false)
  const { imagesData, setImagesData } = useAdminContext()
  function toggleDelete(img: (typeof imagesData)[number]) {
    if (toDelete.includes(img.key)) {
      setToDelete(toDelete.filter((k) => k !== img.key))
      return
    }
    setToDelete([...toDelete, img.key])
  }
  async function submit() {
    setPending(true)
    setSuccess(false)
    setError("")
    if (toDelete.length) {
      const res = await fetch(
        "/api/uploadthing?data=" + `["${toDelete.join(`","`)}"]`,
        {
          method: "DELETE",
        },
      )
      console.log(res.status)
      switch (res.status) {
        case 200: {
          setSuccess(true)
          setImagesData((items) =>
            items.filter((e) => !toDelete.includes(e.key)),
          )
          setToDelete([])
          break
        }
        case 500: {
          setError("rejected")
          break
        }
        default: {
          setError("unknown error with response from server")
          break
        }
      }
    }
    setPending(false)
  }
  return (
    <div>
      {error ? <p>Error: {error}</p> : null}
      {success ? <p>data deleted</p> : null}
      <Button disabled={pending} onClick={submit}>
        submit
      </Button>
      <ul className="flex flex-wrap gap-1 max-w-screen-lg w-full m-1">
        {imagesData.map((img) => (
          <li key={img.key}>
            <Button
              variant={toDelete.includes(img.key) ? "destructive" : "default"}
              onClick={() => toggleDelete(img)}
              className="h-auto p-1"
              disabled={pending}
            >
              <Image
                src={img.src}
                alt={img.key}
                height={800}
                width={1920}
                className="w-auto h-[240px] object-contain rounded-sm shadow-sm"
              />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
