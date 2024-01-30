import { getAuth } from "@/lib/auth"
import { createUploadthing, type FileRouter } from "uploadthing/next"
import { createRouteHandler } from "uploadthing/server"

const f = createUploadthing()

export const fileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const user = await getAuth(req)

      if (!user) throw new Error("Unauthorized")

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userName: user.name }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for user name:", metadata.userName)

      console.log("file url", file.url)

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userName }
    }),
} satisfies FileRouter

export type fileRouter = typeof fileRouter
// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: fileRouter,
})
