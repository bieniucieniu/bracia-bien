import { createUploadthing, type FileRouter } from "uploadthing/next"
import { getServerSession } from "next-auth"
import authOptions from "./auth"

const f = createUploadthing()

const auth = async (_req: Request) => {
	const session = await getServerSession(authOptions)
	if (!session) return
	switch (session.user?.email) {
		case "bienmikolaj@gmail.com":
		case "braciabien@gmail.com":
			return { id: session.user.email }

		default:
			return undefined
	}
}

export const fileRouter = {
	imageUploader: f({ image: { maxFileSize: "4MB" } })
		.middleware(async ({ req }) => {
			const user = await auth(req)

			if (!user) throw new Error("Unauthorized")

			return { userId: user.id }
		})
		.onUploadComplete(async ({ metadata, file }) => {
			console.log("Upload complete for userId:", metadata.userId)

			console.log("file url", file.url)
		}),
} satisfies FileRouter

export type TFileRouter = typeof fileRouter
