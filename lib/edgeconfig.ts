type edgeConfig = {
  mainImgKeys?: string[]
  currentImgKeys?: string[]
}

type edgePOST = {
  delete: edgeConfig
  add: edgeConfig
  set: edgeConfig
}
