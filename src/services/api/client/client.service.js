import axios from "@service/axios";

export const createClient = async (client) => await axios.post("/client", client);
