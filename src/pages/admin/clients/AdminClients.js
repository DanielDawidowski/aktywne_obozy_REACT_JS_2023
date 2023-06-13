import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { clientService } from "@service/api/clients/clients.service";
import { Utils } from "@service/utils/utils.service";
import useEffectOnce from "@hooks/useEffectOnce";
import { ClientUtils } from "@service/utils/client-utils.service";

function AdminClients() {
  const [clients, setClients] = useState([]);
  const [currentPage] = useState(1);

  const dispatch = useDispatch();

  const getAllClients = useCallback(async () => {
    try {
      const response = await clientService.getAllClients(currentPage);
      setClients(response.data.clients);
      // console.log("response", response.data.clients);
    } catch (error) {
      console.log("error", error);
    }
  }, [currentPage]);

  const deleteClient = async (clientId) => {
    const result = confirm("Czy na pewno chcesz usunąć?");
    if (result) {
      try {
        const response = await clientService.deleteClient(clientId);
        Utils.dispatchNotification(response.data.message, "success", dispatch);
        // console.log("response", response);
        getAllClients();
        return response;
      } catch (error) {
        Utils.dispatchNotification(error?.response?.data.message, "error", dispatch);
      }
    }
  };

  useEffectOnce(() => {
    getAllClients();
  });

  useEffect(() => {
    ClientUtils.socketIOClient(clients, setClients);
  }, [clients]);

  const sortedList = useMemo(() => {
    return clients.sort();
  }, [clients]);

  return (
    <div className="admin__main--clients">
      {sortedList.map((client) => (
        <div key={client._id} className="admin__main--clients--item">
          <h4>{client.name}</h4>
          <div>
            <Link to={`/admin/client/${client._id}`}>
              <AiOutlineEdit />
            </Link>
            <MdDeleteForever style={{ fill: "red" }} onClick={() => deleteClient(client._id)} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminClients;
