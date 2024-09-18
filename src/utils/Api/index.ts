import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
  } from 'axios';
  
  class Api {
    protected axios: AxiosInstance;
  
    constructor(baseURL: string) {
      this.axios = axios.create({
        baseURL,
      });
  
      // Configuração de interceptores de requisição
      this.axios.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
          // Adicionar lógica antes de enviar a requisição, como headers, etc.
          return config;
        },
        (error) => {
          // Tratar erro de requisição
          return Promise.reject(error);
        }
      );
  
      // Configuração de interceptores de resposta
      this.axios.interceptors.response.use(
        (response: AxiosResponse) => response,
        (error) => {
          // Tratar erro de resposta
          return Promise.reject(error);
        }
      );
    }
  
    protected get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
      return this.axios.get<T>(url, config);
    }
  
    protected post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
      return this.axios.post<T>(url, data, config);
    }
  
    // Outros métodos como PUT, DELETE, PATCH podem ser adicionados conforme a necessidade.
  }
  
  export default Api;
  