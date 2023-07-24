import AuthButton from "@/components/Auth"
import UploadButton from "@/components/UploadButton"
import { utapi } from "uploadthing/server"

export default async function Upload() {
	// const files = await utapi.listFiles()
	return (
		<main className="pt-20">
			<AuthButton />
			<UploadButton />
		</main>
	)
}
