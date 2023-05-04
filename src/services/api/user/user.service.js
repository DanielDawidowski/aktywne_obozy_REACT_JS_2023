import axios from "@service/axios";

class UserService {
  async logoutUser() {
    const response = await axios.get("/signout");
    return response;
  }

  async checkCurrentUser() {
    const response = await axios.get("/currentuser");
    return response;
  }
}

export const userService = new UserService();
