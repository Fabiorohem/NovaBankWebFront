import Api from "@/utils/Api";

interface Address {
  cep: string;
  street: string;
  //   complemento: string;
  neighborhood: string;
  city: string;
  state: string;
  erro?: boolean;
}

class CepApi extends Api {
  constructor() {
    super(process.env.NEXT_PUBLIC_CEP_API_BASE_URL || "");
  }

  public async getAddressByCep(cep: string): Promise<Address> {
    try {
      const response = await this.get<Address>(`${cep}`);
      if (response.data.erro) {
        throw new Error("CEP não encontrado");
      }
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Erro ao buscar o endereço: " + error.message);
      } else {
        throw new Error("Erro desconhecido ao buscar o endereço");
      }
    }
  }
}

export default CepApi;
