import { createRouteHandler } from "uploadthing/next"
import { fileRouter } from "./core"
import type { NextRequest } from "next/server"

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: fileRouter,
})

export function DELETE(req: NextRequest) {}
