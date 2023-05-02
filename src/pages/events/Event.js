import Button from "@components/button/Button";
import Input from "@components/input/Input";
import { eventService } from "@service/api/events/events.service";
import { createClient } from "@service/api/client/client.service";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const initialState = {
  eventId: "",
  name: "",
  email: "",
  tel: "",
  birthDate: ""
};

function Event() {
  const [values, setValues] = useState(initialState);
  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(false);

  const { eventId } = useParams();

  const { name, email, tel, birthDate } = values;

  const getEvent = useCallback(async () => {
    try {
      const response = await eventService.getEvent(eventId);
      console.log("eventId", eventId);

      setEvent(response.data.event);
    } catch (error) {
      console.log("error", error);
    }
  }, [eventId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    createClient(values)
      .then((res) => {
        console.log(res);
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        console.error(err.response.data.err);
      });
  };

  useEffect(() => {
    getEvent();
  }, [getEvent]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, " ----- ", e.target.value);
  };

  return (
    <div>
      <h1>{event.event}</h1>
      <h1>{event.eventType}</h1>
      <h1>{event.price}</h1>
      <h1>{event.discountPrice}</h1>
      <h1>{eventId}</h1>

      <form onSubmit={handleSubmit}>
        <Input
          id="name"
          name="name"
          type="text"
          value={name}
          labelText="Imię i Nazwisko"
          placeholder="---"
          // style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
          handleChange={handleChange}
        />
        <Input
          id="email"
          name="email"
          type="text"
          value={email}
          labelText="Email"
          placeholder="---"
          // style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
          handleChange={handleChange}
        />
        <Input
          id="tel"
          name="tel"
          type="text"
          value={tel}
          labelText="Telefon"
          placeholder="---"
          // style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
          handleChange={handleChange}
        />
        <Input
          id="birthDate"
          name="birthDate"
          type="text"
          value={birthDate}
          labelText="Data Urodzenia"
          placeholder="---"
          // style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
          handleChange={handleChange}
        />
        <Button
          label={`${loading ? "SIGNUP IN PROGRESS..." : "SIGNUP"}`}
          className="auth-button button"
          disabled={!name || !email || !tel || !birthDate}
        />
      </form>
    </div>
  );
}

export default Event;
