import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Input from "@components/input/Input";
import Button from "@components/button/Button";
import { eventService } from "@service/api/events/events.service";

const initialState = {
  name: "",
  bgColor: "",
  eventType: "",
  price: "",
  discountPrice: "",
  startDate: "",
  endDate: ""
};

function EditEvent() {
  const [values, setValues] = useState(initialState);
  const [showEvent, setShowEvent] = useState({});
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { eventId } = useParams();

  const { name, eventType, price, discountPrice, startDate, endDate } = values;

  const getEvent = useCallback(async () => {
    try {
      const response = await eventService.getEvent(eventId);
      setShowEvent(response.data.event);
    } catch (error) {
      console.log("error", error);
    }
  }, [eventId]);

  const updateClient = async (e) => {
    e.preventDefault();
    try {
      const response = await eventService.updateEvent(eventId, values);
      setLoading(false);
      setHasError(false);
      setValues(initialState);
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
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, " ---- ", e.target.value);
  };
  return (
    <>
      {showEvent.name}
      <div style={{ marginTop: "20px" }}>
        {hasError && errorMessage && <h4>{errorMessage}</h4>}

        <form>
          <Input
            id="name"
            name="name"
            type="text"
            value={name}
            labelText="Nazwa wyjazdu"
            placeholder={showEvent.name}
            style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
            handleChange={handleChange}
          />
          <Input
            id="price"
            name="price"
            type="text"
            value={price}
            labelText="Cena"
            placeholder={showEvent.price}
            style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
            handleChange={handleChange}
          />
          <Input
            id="discountPrice"
            name="discountPrice"
            type="text"
            value={discountPrice}
            labelText="Telefon"
            placeholder={showEvent.discountPrice}
            style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
            handleChange={handleChange}
          />
          <Input
            id="startDate"
            name="startDate"
            type="date"
            value={startDate}
            labelText="Data rozpoczęcia"
            placeholder={showEvent.startDate}
            style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
            handleChange={handleChange}
          />
          <Input
            id="endDate"
            name="endDate"
            type="date"
            value={endDate}
            labelText="Data zakonczenia"
            placeholder={showEvent.endDate}
            style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
            handleChange={handleChange}
          />

          <div>
            <label>Kategoria</label>
            <select name="eventType" className="form-control" onChange={handleChange} value={eventType} required>
              <option defaultChecked value="">
                Wybierz
              </option>
              <option value="gory">Góry</option>
              <option value="splywy">Spływy</option>
              <option value="morze">Morze</option>
              <option value="polkolonie">Półkolonie</option>
            </select>
          </div>

          <Button
            label={`${loading ? "Wysyłanie..." : "Wyślij"}`}
            className="auth-button button"
            disabled={!name || !eventType || !discountPrice || !startDate || !endDate || !price}
            handleClick={updateClient}
          />
        </form>
      </div>
    </>
  );
}

export default EditEvent;
