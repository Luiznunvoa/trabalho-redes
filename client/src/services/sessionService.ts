import { Credentials } from "../types/profiles";
import { AxiosHttpAdapter } from "../adapters/httpClient";

export class SessionService {
  private http: AxiosHttpAdapter;

  constructor(httpAdapter: AxiosHttpAdapter) {
    this.http = httpAdapter;
  }

  async start(data: Credentials): Promise<{ token: string }> {
    return await this.http.requestPrivateBackend({
      method: "post",
      url: "/sessions",
      data
    });
  }
}
