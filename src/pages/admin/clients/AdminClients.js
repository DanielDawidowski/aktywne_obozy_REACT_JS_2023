import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { Document, Page, Text, Font, PDFDownloadLink } from "@react-pdf/renderer";
import { Table, TableHeader, TableCell, TableBody, DataTableCell } from "@david.kucsai/react-pdf-table";
import { clientService } from "@service/api/clients/clients.service";
import { Utils } from "@service/utils/utils.service";
import useEffectOnce from "@hooks/useEffectOnce";
import { ClientUtils } from "@service/utils/client-utils.service";
import { eventService } from "@service/api/events/events.service";
import Input from "@components/input/Input";

Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf"
});

function AdminClients() {
  const [clients, setClients] = useState([]);
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState([]);

  const [currentPage] = useState(1);

  const dispatch = useDispatch();

  const getAllEvents = useCallback(async () => {
    try {
      const response = await eventService.getAllEvents(currentPage);
      setEvents(response.data.events);
      // console.log("response", response.data.events);
    } catch (error) {
      console.log("error", error);
    }
  }, [currentPage]);

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
    getAllEvents();
  });

  useEffect(() => {
    ClientUtils.socketIOClient(clients, setClients);
  }, [clients]);

  const handleChange = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setFilters([...filters, value]);
    } else {
      setFilters(filters.filter((filter) => filter !== value));
    }
  };

  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      return filters.every((filter) => client.eventName.includes(filter));
    });
  }, [clients, filters]);

  return (
    <div className="admin__main--clients">
      <div className="admin__main--clients--filters">
        {events.map((event, i) => (
          <div key={i} className="admin__main--clients--checkbox">
            <Input
              id="name"
              name="name"
              type="checkbox"
              value={event.name}
              labelText={event.name}
              placeholder="---"
              handleChange={handleChange}
            />
          </div>
        ))}
        <div className="admin__main--clients--checkbox">
          <PDFDownloadLink
            document={
              <Document>
                <Page size="A4" style={styles.body}>
                  <Text style={styles.header} fixed>
                    ~ {new Date().toLocaleString()} ~
                  </Text>
                  <Text style={styles.title}>Lista zgłoszeń na {filters[0]}</Text>

                  <Table>
                    <TableHeader>
                      <TableCell>Imię i nazwisko</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Telefon</TableCell>
                      <TableCell>Wydarzenie</TableCell>
                    </TableHeader>
                  </Table>

                  <Table data={filteredClients}>
                    <TableBody>
                      <DataTableCell getContent={(x) => x.name} />
                      <DataTableCell getContent={(x) => x.email} />
                      <DataTableCell getContent={(x) => x.tel} />
                      <DataTableCell getContent={(x) => x.eventName} />
                    </TableBody>
                  </Table>
                </Page>
              </Document>
            }
            fileName="zgłoszenia.pdf"
            className="admin__main--clients--button"
          >
            Download PDF
          </PDFDownloadLink>
        </div>
      </div>
      {filteredClients.map((client) => (
        <div key={client._id} className="admin__main--clients--item">
          <h4>{client.name}</h4>
          <h5>{client.eventName}</h5>
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

const styles = {
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    fontFamily: "Roboto"
  },
  title: {
    fontSize: 24,
    textAlign: "center"
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40
  },
  subtitle: {
    fontSize: 18,
    margin: 12
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify"
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey"
  },
  footer: {
    padding: "100px",
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey"
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey"
  }
};

export default AdminClients;
