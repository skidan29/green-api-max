export interface Instance {
  idInstance: string
  tokenInstance: string
}

export interface ChatInfo {
  exist: boolean
  chatId: string
  fromCache: boolean
}

export interface ChatInfoWithPhone extends ChatInfo {
  phoneNumber: number
}
