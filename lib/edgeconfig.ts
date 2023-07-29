export type edgeConfigType = {
  mainImgKeys?: string[]
  currentImgKeys?: string[]
}

export type edgePOST = {
  mainImgKeys: {
    delete: string[]
    add: string[]
  }
  currentImgKeys?: {
    delete: string[]
    add: string[]
  }
}
