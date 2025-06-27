import { AxiosHttpAdapter } from "../adapters/httpClient";
import { Message } from "../types/conversation";

export class ConversationService {
  private http: AxiosHttpAdapter;

  constructor(httpAdapter: AxiosHttpAdapter) {
    this.http = httpAdapter;
  }

  async createMessage(data: { content: string, conversationId: string }): Promise<void> {
    return await this.http.requestPrivateBackend({
      method: "post",
      url: `/conversations/messages/${data.conversationId}`,
      data: { content: data.content }
    });
  }

  async getMessages(data: { conversationId: string }): Promise<{ messages: Message[]}> {
    const response = await this.http.requestPrivateBackend({
      method: "get",
      url: `/conversations/messages/${data.conversationId}`,
      withCredentials: true
    });
    
    console.log(response);

    return response;
  }
}
