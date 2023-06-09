import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Input from "@components/input/Input";
// import { AiOutlineEdit } from "react-icons/ai";
import Button from "@components/button/Button";
import { useParams } from "react-router-dom";
import { clientService } from "@service/api/clients/clients.service";
import { eventService } from "@service/api/events/events.service";

const initialState = {
  eventId: "",
  name: "",
  email: "",
  tel: "",
  birthDate: "",
  price: "",
  eventName: ""
};

const EditClient = () => {
  const [values, setValues] = useState(initialState);
  // const [openAccordion, setOpenAccordion] = useState(null);
  const [client, setClient] = useState({});
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [events, setEvents] = useState([]);
  const [checked, setChecked] = useState("");
  const [showEventPrice, setShowEventPrice] = useState("");
  const [currentPage] = useState(1);

  const { clientId } = useParams();

  const getAllEvents = useCallback(async () => {
    try {
      const response = await eventService.getAllEvents(currentPage);
      setEvents(response.data.events);
    } catch (error) {
      console.log("error", error);
    }
  }, [currentPage]);

  useEffect(() => {
    getAllEvents();
  }, [getAllEvents]);

  const { name, email, tel, birthDate, price } = values;

  // const handleAccordion = (index) => {
  //   setOpenAccordion(openAccordion === index ? null : index);
  // };

  const showEventPriceHandler = (e) => {
    for (let i = 0; i < events.length; i++) {
      if (events[i]._id === e.target.value) {
        setShowEventPrice(e.target.value);
      }
    }
  };

  const getClient = useCallback(async () => {
    try {
      const response = await clientService.getClient(clientId);
      setClient(response.data.client);
    } catch (error) {
      console.log("error", error);
    }
  }, [clientId]);

  const updateClient = async (e) => {
    e.preventDefault();

    try {
      const response = await clientService.updateClient(clientId, values);
      setLoading(false);
      setHasError(false);
      console.log("values", values);
      setValues(initialState);
      setChecked("");
      return response;
    } catch (error) {
      setLoading(false);
      setHasError(true);
      setErrorMessage(error?.response?.data.message);
    }
  };

  const handleChange = (e) => {
    if (e.target.type === "select-one") {
      setChecked("");
      setValues({ ...values, eventId: e.target.value, eventName: e.target.selectedOptions[0].innerHTML });
      showEventPriceHandler(e);
    } else if (e.target.type === "checkbox") {
      setChecked(e.target.name);
      setValues({ ...values, price: e.target.labels[0].innerHTML });
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    getClient();
  }, [getClient]);

  return (
    <>
      <motion.div>
        <h3>{client.name}</h3>
        <div>
          {hasError && errorMessage && <h4>{errorMessage}</h4>}
          <form>
            <Input
              id="name"
              name="name"
              type="text"
              value={name}
              labelText="Imię i Nazwisko"
              placeholder={client.name}
              style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
              handleChange={handleChange}
            />
            <Input
              id="email"
              name="email"
              type="text"
              value={email}
              labelText="Email"
              placeholder={client.email}
              style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
              handleChange={handleChange}
            />
            <Input
              id="tel"
              name="tel"
              type="text"
              value={tel}
              labelText="Telefon"
              placeholder={client.tel}
              style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
              handleChange={handleChange}
            />
            <Input
              id="birthDate"
              name="birthDate"
              type="text"
              value={birthDate}
              labelText="Data Urodzenia"
              placeholder={client.birthDate}
              style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
              handleChange={handleChange}
            />
            <select name="eventId" id="eventId" onChange={handleChange}>
              <option defaultChecked value="">
                Wybierz Wyjazd
              </option>
              {events.map((event, index) => (
                <option key={index} value={event._id}>
                  {event.name}
                </option>
              ))}
            </select>
            {events.map(
              (event, index) =>
                showEventPrice === event._id && (
                  <div key={index}>
                    <Input
                      id="price"
                      name="price"
                      type="checkbox"
                      value={price}
                      labelText={event.price}
                      placeholder="---"
                      style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
                      handleChange={handleChange}
                      checked={checked === "price"}
                    />
                    {event.discountPrice && (
                      <Input
                        id="discountPrice"
                        name="discountPrice"
                        type="checkbox"
                        value={price}
                        labelText={event.discountPrice}
                        placeholder="---"
                        style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
                        handleChange={handleChange}
                        checked={checked === "discountPrice"}
                      />
                    )}
                  </div>
                )
            )}
            <Button
              label={`${loading ? "Wysyłanie..." : "Wyślij"}`}
              className="auth-button button"
              disabled={!name || !email || !tel || !birthDate || !price || !values.eventId}
              handleClick={updateClient}
            />
          </form>
        </div>
      </motion.div>
    </>
  );
};
export default EditClient;
