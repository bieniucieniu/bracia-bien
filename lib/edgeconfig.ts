export type edgeConfigType = {
  mainImgKeys?: string[]
  currentImgKeys?: string[]
}

export type edgePOST = {
  delete: edgeConfigType
  add: edgeConfigType
  set: edgeConfigType
}
