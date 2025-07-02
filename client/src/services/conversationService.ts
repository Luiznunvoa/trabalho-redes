import { AxiosHttpAdapter } from "../adapters/httpClient";
import { Conversation } from "../types/conversation";

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
}
