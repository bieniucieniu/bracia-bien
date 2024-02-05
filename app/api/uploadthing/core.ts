import { getAuth } from "@/lib/auth"
import {
  createUploadthing,
  type FileRouter as UploadthingFileRouter,
} from "uploadthing/next"

const f = createUploadthing()

export const fileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "1MB", maxFileCount: 100 } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await getAuth(req)

      // If you throw, the user will not be able to upload
      if (!user) throw new Error("Unauthorized")

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { name: user.name ?? "unknown" } as { [k: string]: any }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userName:", metadata.name)

      console.log("file url", file.url)

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.name }
    }),
} satisfies UploadthingFileRouter

export type FileRouter = typeof fileRouter
