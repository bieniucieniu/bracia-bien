export type edgeConfigType = {
  mainImgKeys?: string[]
  currentImgKeys?: string[]
}
export async function setConfig(
  newConfig: edgeConfigType,
  onComplete?: (res: Response) => void,
) {
  const res = await fetch("/api/edgeconfig", {
    method: "POST",
    body: JSON.stringify(newConfig),
  })

  onComplete && onComplete(res)
}
