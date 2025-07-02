import { AxiosHttpAdapter } from "../adapters/httpClient";
import { Conversation, Message } from "../types/conversation";

export type GetMessagesResponse = { 
  messages: Message[], 
  meta: { 
    page: number, 
    pageSize: number, 
    total: number, 
    totalPages: number } 
}

export class ConversationService {
  private http: AxiosHttpAdapter;

  constructor(httpAdapter: AxiosHttpAdapter) {
    this.http = httpAdapter;
  }

  async createConverstions(data: { name: string }): Promise<Conversation> {
    return await this.http.requestPrivateBackend({
      method: "post",
      url: `/conversations`,
      data
    });
  }

  async getConversations(data: { allConversations?: boolean, page: number }): Promise<{ conversations: Conversation[] }> {
    let params;
    if (data.allConversations) {
      params = { page: data.page, allConversations: data.allConversations || false }
    } else {
      params = { page: data.page }
    }

    return await this.http.requestPrivateBackend({
      method: "get",
      url: `/conversations`,
      params
    });
  }

  async addUser(data: { conversationId: string, userId: string }): Promise<void> {
    return await this.http.requestPrivateBackend({
      method: "post",
      url: `/conversations/add-user/${data.conversationId}`,
      data: { userId: data.userId }
    });
  }

  async createMessage(data: { content: string, conversationId: string }): Promise<void> {
    return await this.http.requestPrivateBackend({
      method: "post",
      url: `/conversations/messages/${data.conversationId}`,
      data: { content: data.content }
    });
  }

  async getMessages(data: { conversationId: string, page?: number, pageSize?: number }): Promise<GetMessagesResponse> {
    return await this.http.requestPrivateBackend({
      method: "get",
      url: `/conversations/messages/${data.conversationId}`,
      withCredentials: true,
      params: { page: data.page, pageSize: data.pageSize }
    });
  }
}
