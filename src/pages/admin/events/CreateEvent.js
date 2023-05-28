import React, { useState } from "react";
import Button from "@components/button/Button";
import Input from "@components/input/Input";
import { eventService } from "@service/api/events/events.service";

const initialState = {
  name: "",
  bgColor: "#4aa1f3",
  eventType: "gory",
  price: "1000",
  discountPrice: "700",
  startDate: "2023-06-29",
  endDate: "2023-07-07"
};

function CreateEvent() {
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { name, bgColor, eventType, price, discountPrice, startDate, endDate } = values;

  const createEvent = async (e) => {
    e.preventDefault();
    try {
      const response = await eventService.createEvent(values);
      setLoading(false);
      setHasError(false);
      return response;
    } catch (error) {
      setLoading(false);
      setHasError(true);
      setErrorMessage(error?.response?.data.message);
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, " ---- ", e.target.value);
  };

  return (
    <>
      {hasError && errorMessage && <h4>{errorMessage}</h4>}
      <form>
        <Input
          id="name"
          name="name"
          type="text"
          value={name}
          labelText="Nazwa wyjazdu"
          placeholder="---"
          style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
          handleChange={handleChange}
        />
        <Input
          id="price"
          name="price"
          type="text"
          value={price}
          labelText="Cena"
          placeholder="---"
          style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
          handleChange={handleChange}
        />
        <Input
          id="discountPrice"
          name="discountPrice"
          type="text"
          value={discountPrice}
          labelText="Telefon"
          placeholder="---"
          style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
          handleChange={handleChange}
        />
        <Input
          id="startDate"
          name="startDate"
          type="date"
          value={startDate}
          labelText="Data rozpoczęcia"
          placeholder="---"
          style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
          handleChange={handleChange}
        />
        <Input
          id="endDate"
          name="endDate"
          type="date"
          value={endDate}
          labelText="Data zakonczenia"
          placeholder="---"
          style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
          handleChange={handleChange}
        />
        <div>
          <label>Kategoria</label>
          <select name="eventType" className="form-control" onChange={handleChange} defaultValue={eventType} required>
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
          label={`${loading ? "Wysyłanie..." : "Utwórz"}`}
          className="auth-button button"
          disabled={!name || !bgColor || !eventType || !price || !discountPrice || !startDate || !endDate}
          handleClick={createEvent}
        />
      </form>
    </>
  );
}

export default CreateEvent;
