export async function deleteFiles(
	items: string[],
	onCompleat?: (res: Response) => void,
) {
	const res = await fetch("/api/uploadthing", {
		method: "PATCH",
		body: JSON.stringify({ items }),
	})

	onCompleat && onCompleat(res)
}
