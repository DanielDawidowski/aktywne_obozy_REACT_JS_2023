import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "@components/layout/Layout";
import Button from "@components/button/Button";
import Input from "@components/input/Input";
import { eventService } from "@service/api/events/events.service";
import { clientService } from "@service/api/clients/clients.service";

const initialState = {
  eventId: "",
  name: "",
  email: "",
  tel: "",
  birthDate: "",
  price: ""
};

function Event() {
  const [values, setValues] = useState(initialState);
  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [checked, setChecked] = useState("");

  const { eventId } = useParams();

  const { name, email, tel, birthDate, price } = values;

  const getEvent = useCallback(async () => {
    try {
      const response = await eventService.getEvent(eventId);
      setEvent(response.data.event);
    } catch (error) {
      console.log("error", error);
    }
  }, [eventId]);

  const createClient = async (e) => {
    e.preventDefault();
    values.eventId = eventId;
    try {
      const response = await clientService.createClient(values);
      setLoading(false);
      setHasError(false);
      setValues(initialState);
      setChecked("");
      return response;
    } catch (error) {
      setLoading(false);
      setHasError(true);
      setErrorMessage(error?.response?.data.message);
    }
  };

  useEffect(() => {
    getEvent();
  }, [getEvent]);

  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      setValues({ ...values, price: e.target.labels[0].innerHTML });
      setChecked(e.target.name);
      console.log(e.target.labels[0].innerHTML);
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });
      // console.log(e.target.name, " ---- ", e.target.value);
    }
  };

  return (
    <Layout>
      <h1>{event.name}</h1>
      <h1>{event.eventType}</h1>

      {hasError && errorMessage && <h4>{errorMessage}</h4>}
      <form>
        <Input
          id="name"
          name="name"
          type="text"
          value={name}
          labelText="Imię i Nazwisko"
          placeholder="---"
          style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
          handleChange={handleChange}
        />
        <Input
          id="email"
          name="email"
          type="text"
          value={email}
          labelText="Email"
          placeholder="---"
          style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
          handleChange={handleChange}
        />
        <Input
          id="tel"
          name="tel"
          type="text"
          value={tel}
          labelText="Telefon"
          placeholder="---"
          style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
          handleChange={handleChange}
        />
        <Input
          id="birthDate"
          name="birthDate"
          type="text"
          value={birthDate}
          labelText="Data Urodzenia"
          placeholder="---"
          style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
          handleChange={handleChange}
        />
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
        <Button
          label={`${loading ? "Wysyłanie..." : "Wyślij"}`}
          className="auth-button button"
          disabled={!name || !email || !tel || !birthDate || !price}
          handleClick={createClient}
        />
      </form>
    </Layout>
  );
}

export default Event;
