import React, { useRef, useState } from "react";
import Button from "@components/button/Button";
import Input from "@components/input/Input";
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

function CreateEvent() {
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef();

  const { name, eventType, price, discountPrice, startDate, endDate, image } = values;

  const createEvent = async (e) => {
    e.preventDefault();
    try {
      const response =
        image === "" ? await eventService.createEvent(values) : await eventService.createEventWithImage(values);
      setLoading(false);
      setHasError(false);
      setValues(initialState);
      console.log("response", response);

      return response;
    } catch (error) {
      setLoading(false);
      setHasError(true);
      setErrorMessage(error?.response?.data.message);
    }
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

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, " ---- ", e.target.value);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const fileValue = await readAsBase64(file);
    setValues({ ...values, image: fileValue });
  };

  return (
    <>
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
          labelText="Cena KRUS"
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
            <option value="Góry">Góry</option>
            <option value="Spływy">Spływy</option>
            <option value="Morze">Morze</option>
            <option value="Półkolonie">Półkolonie</option>
          </select>
        </div>
        <Button
          label={`${loading ? "Wysyłanie..." : "Utwórz"}`}
          className="auth-button button"
          disabled={!name || !eventType || !price || !startDate || !endDate}
          handleClick={createEvent}
        />
      </form>
    </>
  );
}

export default CreateEvent;
