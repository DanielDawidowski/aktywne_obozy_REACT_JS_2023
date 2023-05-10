import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

import { clientService } from "@service/api/clients/clients.service";

import Layout from "@components/layout/Layout";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";

function AdminClients() {
  const [clients, setClients] = useState([]);

  const [currentPage] = useState(1);

  const getAllClients = useCallback(async () => {
    try {
      const response = await clientService.getAllClients(currentPage);
      setClients(response.data.clients);
      console.log("response", response.data.clients);
    } catch (error) {
      console.log("error", error);
    }
  }, [currentPage]);

  useEffect(() => {
    getAllClients();
  }, [getAllClients]);

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0, transition: { duration: 1.5 } }}
        exit={{ opacity: 0, x: 100, transition: { duration: 1.5 } }}
      >
        {clients.map((client) => (
          <div key={client._id}>
            <h3>{client.name}</h3>
            <Link to={`/admin/client/${client._id}`}>
              <AiOutlineEdit />
            </Link>
          </div>
        ))}
      </motion.div>
    </Layout>
  );
}

export default AdminClients;
