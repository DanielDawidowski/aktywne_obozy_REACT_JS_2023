import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import Input from "@components/input/Input";
import Button from "@components/button/Button";
import { eventService } from "@service/api/events/events.service";

const initialState = {
  name: "",
  eventType: "",
  price: "",
  discountPrice: "",
  startDate: "",
  endDate: "",
  image: ""
};

function EditEvent() {
  const [values, setValues] = useState(initialState);
  const [showEvent, setShowEvent] = useState({});
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef();

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

  const readAsBase64 = (file) => {
    const reader = new FileReader();
    const fileValue = new Promise((resolve, reject) => {
      reader.addEventListener("load", () => {
        resolve(reader.result);
      });

      reader.addEventListener("error", (event) => {
        reject(event);
      });

      reader.readAsDataURL(file);
    });
    return fileValue;
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const fileValue = await readAsBase64(file);
    setValues({ ...values, image: fileValue });
  };

  return (
    <>
      {showEvent.name}
      <div style={{ marginTop: "20px" }}>
        {hasError && errorMessage && <h4>{errorMessage}</h4>}

        <form>
          <Input
            name="image"
            type="file"
            className="file-input"
            ref={fileInputRef}
            onClick={() => {
              if (fileInputRef.current) {
                fileInputRef.current.value = null;
              }
            }}
            handleChange={handleFileChange}
          />
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
            labelText="Cena KRUS"
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
              <option value="Góry">Góry</option>
              <option value="Spływy">Spływy</option>
              <option value="Morze">Morze</option>
              <option value="Półkolonie">Półkolonie</option>
            </select>
          </div>

          <Button
            label={`${loading ? "Wysyłanie..." : "Wyślij"}`}
            className="auth-button button"
            disabled={!name || !eventType || !startDate || !endDate || !price}
            handleClick={updateClient}
          />
        </form>
      </div>
    </>
  );
}

export default EditEvent;
