import { socketService } from "@service/socket/socket.service";
import { cloneDeep } from "lodash";

export class ClientUtils {
  static socketIOClient(clients, setClients) {
    clients = cloneDeep(clients);
    socketService?.socket?.on("add client", (client) => {
      clients = [client, ...clients];
      setClients(clients);
    });
  }
}
