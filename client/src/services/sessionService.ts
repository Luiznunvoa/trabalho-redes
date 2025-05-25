import { AxiosHttpAdapter } from "../adapters/httpClient";

export class SessionService {
  private http: AxiosHttpAdapter;

  constructor(httpAdapter: AxiosHttpAdapter) {
    this.http = httpAdapter;
  }

  async start(data: { email: string, password: string }): Promise<{ token: string }> {
    return await this.http.requestPrivateBackend({
      method: "post",
      url: "/sessions",
      data
    });
  }
}
