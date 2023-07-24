"use client"

// You need to import our styles for the button to look right. Best to import in the root /layout.tsx but this is fine
import "@uploadthing/react/styles.css"

import { UploadButton } from "@/utils/uploadthing"

export default function Home() {
	return (
		<UploadButton
			endpoint="imageUploader"
			onClientUploadComplete={(res) => {
				// Do something with the response
				console.log("Files: ", res)
			}}
			onUploadError={(error: Error) => {
				// Do something with the error.
				alert(`ERROR! ${error.message}`)
			}}
		/>
	)
}
