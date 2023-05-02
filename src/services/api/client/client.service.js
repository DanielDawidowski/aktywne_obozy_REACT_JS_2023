import axios from "@service/axios";

class ClientService {
  async createClient(body) {
    const response = await axios.post("/client", body);
    return response;
  }
}

export const clientService = new ClientService();
