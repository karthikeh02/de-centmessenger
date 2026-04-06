export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  recipientId: string;
  content: string;
  contentType: MessageContentType;
  timestamp: number;
  status: MessageStatus;
  selfDestructAt?: number;
}

export type MessageContentType = 'text' | 'image' | 'voice' | 'file';

export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read' | 'failed';
