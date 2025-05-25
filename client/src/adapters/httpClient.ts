import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig, InternalAxiosRequestConfig, } from "axios";
import { useSessionStore } from "../stores/useSessionStore";

export class AxiosHttpAdapter {
  private privateBackendInstance: AxiosInstance;

  constructor() {
    const baseURL: string = import.meta.env.VITE_API_BASE_URL;

    this.privateBackendInstance = axios.create({
      baseURL,
    });

    this._setupInterceptors();
  }

  /**
   * Configura os interceptadores da instância Axios.
   *
   * O interceptador de requisição pode ser utilizado para modificar ou enriquecer
   * as requisições (por exemplo, adicionando tokens de autorização).
   *
   * O interceptador de resposta trata os erros globalmente, redirecionando para "/login"
   * se o erro possuir o código 401.
   */
  private _setupInterceptors(): void {
    // Interceptador de requisição
    this.privateBackendInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        // Configuração do accessToken 
        const token = useSessionStore.getState().accessToken;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: any): Promise<any> => Promise.reject(error)
    );

    // Interceptador de resposta para erros
    this.privateBackendInstance.interceptors.response.use(
      (response: AxiosResponse): AxiosResponse => response,
      (error: any): Promise<any> => {
        if (error.response && error.response.status === 401) {
          useSessionStore.getState().reset()
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * Executa uma requisição HTTP utilizando a instância privada do Axios.
   *
   * @param config - Objeto de configuração da requisição Axios (por exemplo, { method, url, data }).
   * @returns Uma Promise que resolve com os dados da resposta da API.
   *
   * @throws Um erro caso a requisição falhe, contendo os dados do erro ou uma mensagem descritiva.
   */
  async requestPrivateBackend(config: AxiosRequestConfig): Promise<any> {
    try {
      const response = await this.privateBackendInstance.request(config);
      return response.data;
    } catch (error: any) {
      console.error(error);
      throw error.response?.data || error.message;
    }
  }
}

