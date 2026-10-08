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

export interface TextMessageData {
  typeMessage: 'textMessage'
  textMessageData: {
    textMessage: string
  }
}

export interface ExtendedTextMessageData {
  typeMessage: 'extendedTextMessage'
  extendedTextMessageData: {
    text: string
    description: string
    title: string
    previewType: string
    jpegThumbnail: string
    forwardingScore: number
    isForwarded: boolean
  }
}

export interface SimplifiedMessage {
  type: 'incomingMessageReceived' | 'outgoingAPIMessageReceived'
  text: string
  timestamp: number
}

export interface SenderData {
  chatId: string
  chatName: string
  chatType: string
  sender: string
  senderName: string
  senderType: string
  senderContactName: string
  senderPhoneNumber: number
}

export interface ReceiveNotification {
  receiptId: number
  body: {
    typeWebhook: string
    instanceData: {
      idInstance: number
      wid: string
      typeInstance: 'v3'
    }
    timestamp: number
    idMessage: string
    senderData: SenderData
    messageData: TextMessageData | ExtendedTextMessageData
  }
}
