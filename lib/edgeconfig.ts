type edgeConfig = {
  mainImgKeys?: string[]
  currentImgKeys?: string[]
}

type edgePOST = {
  delete: edgeConfig
  change: edgeConfig
  set: edgeConfig
}
