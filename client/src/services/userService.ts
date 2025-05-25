import { User } from "types/profiles";
import { AxiosHttpAdapter } from "../adapters/httpClient";

export class UserService {
  private http: AxiosHttpAdapter;

  constructor(httpAdapter: AxiosHttpAdapter) {
    this.http = httpAdapter;
  }

  async profile(): Promise<User> {
    const response = await this.http.requestPrivateBackend({
      method: "get",
      url: "/profile",
    });
    return response.user
  }

  async create(data: { name: string, email: string, password: string }): Promise<void> {
    return await this.http.requestPrivateBackend({
      method: "post",
      url: "/users",
      data
    })
  }
}
