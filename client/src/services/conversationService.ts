import { AxiosHttpAdapter } from "../adapters/httpClient";
import { Conversation, Message } from "../types/conversation";

export class ConversationService {
  private http: AxiosHttpAdapter;

  constructor(httpAdapter: AxiosHttpAdapter) {
    this.http = httpAdapter;
  }

  async getConversations(data: { allConversations?: boolean, page: number}): Promise<{ conversations: Conversation[] }> {
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

  async createMessage(data: { content: string, conversationId: string }): Promise<void> {
    return await this.http.requestPrivateBackend({
      method: "post",
      url: `/conversations/messages/${data.conversationId}`,
      data: { content: data.content }
    });
  }

  async getMessages(data: { conversationId: string }): Promise<{ messages: Message[] }> {
    return await this.http.requestPrivateBackend({
      method: "get",
      url: `/conversations/messages/${data.conversationId}`,
      withCredentials: true
    });
  }
}
