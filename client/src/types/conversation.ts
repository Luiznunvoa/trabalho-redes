export type Conversation = {
  id: string;
  name: string;
  creatadedAt: Date;  
  isParticipant ?: boolean;
}

export type Message = {
  id: string;
  content: string;
  conversationId: string;
  creatadedAt: Date;
  read: boolean;
  senderId: string;
  sender: { name: string }
}
