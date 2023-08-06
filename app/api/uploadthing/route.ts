import { createNextRouteHandler } from "uploadthing/next"

import { fileRouter, deleteHandler } from "@/lib/uploadthing"

// Export routes for Next App Router
export const { GET, POST } = createNextRouteHandler({
  router: fileRouter,
})

export { deleteHandler as PATCH }
