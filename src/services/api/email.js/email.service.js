import axios from "@service/axios";

class EmailService {
  async sendMessage(body) {
    const response = await axios.post("/contact", body);
    return response;
  }
}

export const emailService = new EmailService();
