import axios from "@service/axios";

class ClientService {
  async createClient(body) {
    const response = await axios.post("/client", body);
    return response;
  }

  async getAllClients(page) {
    const response = await axios.get(`/client/all/${page}`);
    return response;
  }

  async getClient(clientId) {
    const response = await axios.get(`/client/${clientId}`);
    return response;
  }

  async updateClient(clientId, body) {
    const response = await axios.put(`/client/${clientId}`, body);
    return response;
  }

  async deleteClient(clientId) {
    const response = await axios.delete(`/client/${clientId}`);
    return response;
  }
}

export const clientService = new ClientService();
