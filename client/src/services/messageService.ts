import { AxiosHttpAdapter } from "../adapters/httpClient";
import { Message } from "../types/conversation";

export type GetMessagesResponse = { 
  messages: Message[], 
  meta: { 
    page: number, 
    pageSize: number, 
    total: number, 
    totalPages: number 
  } 
}

export class MessageService {
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

  async getMessages(data: { conversationId: string, page?: number, pageSize?: number }): Promise<GetMessagesResponse> {
    return await this.http.requestPrivateBackend({
      method: "get",
      url: `/conversations/messages/${data.conversationId}`,
      withCredentials: true,
      params: { page: data.page, pageSize: data.pageSize }
    });
  }
}
