import React, { useRef, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BsFillBookmarkPlusFill } from "react-icons/bs";
import Button from "@components/button/Button";
import Input from "@components/input/Input";
import { eventService } from "@service/api/events/events.service";
import { EventUtils } from "@service/utils/event-utils.service";

const initialState = {
  name: "",
  eventType: "",
  price: "",
  discountPrice: "",
  startDate: "",
  endDate: "",
  image: "",
  address: {
    hotel: "",
    street: "",
    web: ""
  },
  attractions: []
};

function CreateEvent() {
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [attraction, setAttraction] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const fileInputRef = useRef();

  const { name, eventType, price, discountPrice, startDate, endDate, image, address } = values;
  const { hotel, street, web } = address;

  const createEvent = async (e) => {
    e.preventDefault();
    values.attractions = attraction;
    try {
      const response =
        image === "" ? await eventService.createEvent(values) : await eventService.createEventWithImage(values);
      setLoading(false);
      setHasError(false);
      setValues(initialState);
      setAttraction([]);
      console.log("response", response);

      return response;
    } catch (error) {
      setLoading(false);
      setHasError(true);
      setErrorMessage(error?.response?.data.message);
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    if (e.target.name === "hotel" || e.target.name === "street" || e.target.name === "web") {
      setValues({ ...values, address: { ...values.address, [e.target.name]: e.target.value } });
    }
    if (e.target.name === "attraction") {
      setAttraction([e.target.value]);
    }
    // console.log(e.target.name, " ---- ", e.target.value);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const fileValue = await EventUtils.readAsBase64(file);
    setValues({ ...values, image: fileValue });
  };

  const handleAttraction = (e) => {
    if (inputValue.trim() !== "") {
      setAttraction([...attraction, inputValue]);
      setInputValue("");
    }
  };

  const deleteAttraction = (index) => {
    const updatedAttractions = [...attraction];
    updatedAttractions.splice(index, 1);
    setAttraction(updatedAttractions);
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
        <h3>Dane Hotelu</h3>
        <Input
          id="hotel"
          name="hotel"
          type="text"
          value={hotel}
          labelText="Nazwa Hotelu"
          placeholder="---"
          style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
          handleChange={handleChange}
        />
        <Input
          id="street"
          name="street"
          type="text"
          value={street}
          labelText="Ulica Hotelu"
          placeholder="---"
          style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
          handleChange={handleChange}
        />
        <Input
          id="web"
          name="web"
          type="text"
          value={web}
          labelText="Strona www Hotelu"
          placeholder="---"
          style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
          handleChange={handleChange}
        />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
          <Input
            id="inputValue"
            name="inputValue"
            type="text"
            value={inputValue}
            labelText="Atrakcje"
            placeholder="---"
            style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
            handleChange={(e) => setInputValue(e.target.value)}
          />

          <BsFillBookmarkPlusFill style={{ fill: "green", marginLeft: "30px" }} onClick={handleAttraction} />
        </div>
        {attraction.length > 0 && (
          <div className="create__event--attractions">
            <h6>Max 8 atrakcjii</h6>
            <ul style={{ width: "100%" }}>
              {attraction.map((attr, i) => (
                <li key={i} style={{ display: "flex", width: "100%" }}>
                  <h4>{attr}</h4>
                  <AiFillDelete style={{ fill: "red" }} onClick={() => deleteAttraction(i)} />
                </li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ marginTop: "20px" }}>
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
        <div style={{ marginBottom: "20px" }}>
          <Button
            label={`${loading ? "Wysyłanie..." : "Utwórz"}`}
            className="auth-button button"
            disabled={!name || !eventType || !price || !startDate || !endDate}
            handleClick={createEvent}
          />
        </div>
      </form>
    </>
  );
}

export default CreateEvent;
