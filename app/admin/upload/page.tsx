import AuthButton from "@/components/Auth"
import { UploadZone } from "@/components/Upload"
import { listFiles } from "@/utils/uploadthing"
import { utapi } from "uploadthing/server"

export default async function Upload() {
  const files = await listFiles()
  const paths = await utapi.getFileUrls(files.map((e) => e.key))
  return (
    <main className="pt-20">
      <AuthButton />
      <UploadZone />
      {files.map((e, i) => (
        <li key={i}>
          <p>{e.id}</p>
          <p>{e.key}</p>
        </li>
      ))}
      {paths.map((e, i) => (
        <li key={i}>
          <p>{e.url}</p>
          <p>{e.key}</p>
        </li>
      ))}
    </main>
  )
}
