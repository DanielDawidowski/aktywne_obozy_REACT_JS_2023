import React, { useState, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { BsFillBookmarkPlusFill } from "react-icons/bs";
import Input from "@components/input/Input";
import Button from "@components/button/Button";
import { eventService } from "@service/api/events/events.service";
import { EventUtils } from "@service/utils/event-utils.service";
import { useDispatch } from "react-redux";
import { Utils } from "@service/utils/utils.service";
import useEffectOnce from "@hooks/useEffectOnce";

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
  attractions: [],
  extraAttractions: []
};

function EditEvent() {
  const [values, setValues] = useState(initialState);
  const [showEvent, setShowEvent] = useState({});
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [attraction, setAttraction] = useState([]);
  const [attractionValue, setAttractionValue] = useState("");
  const [extraAttraction, setExtraAttraction] = useState([]);
  const [extraAttractionValue, setExtraAttractionValue] = useState("");
  const fileInputRef = useRef();
  const dispatch = useDispatch();

  const { eventId } = useParams();

  const { name, eventType, price, discountPrice, startDate, endDate, address } = values;
  const { hotel, street, web } = address;

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
    values.attractions = attraction;
    values.extraAttractions = extraAttraction;
    try {
      const response = await eventService.updateEvent(eventId, values);
      setLoading(false);
      setHasError(false);
      setValues(initialState);
      setAttraction([]);
      setExtraAttraction([]);
      Utils.dispatchNotification(response.data.message, "success", dispatch);
      return response;
    } catch (error) {
      setLoading(false);
      setHasError(true);
      setErrorMessage(error?.response?.data.message);
      Utils.dispatchNotification(error?.response?.data.message, "error", dispatch);
    }
  };

  useEffectOnce(() => {
    getEvent();
  }, [getEvent]);

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
    if (attractionValue.trim() !== "") {
      setAttraction([...attraction, attractionValue]);
      setAttractionValue("");
    }
  };

  const deleteAttraction = (index) => {
    const updatedAttractions = [...attraction];
    updatedAttractions.splice(index, 1);
    setAttraction(updatedAttractions);
  };

  const handleExtraAttraction = (e) => {
    if (extraAttractionValue.trim() !== "") {
      setExtraAttraction([...extraAttraction, extraAttractionValue]);
      setExtraAttractionValue("");
    }
  };

  const deleteExtraAttraction = (index) => {
    const updatedExtraAttractions = [...extraAttraction];
    updatedExtraAttractions.splice(index, 1);
    setExtraAttraction(updatedExtraAttractions);
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

          <div
            style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}
            onClick={handleAttraction}
          >
            <Input
              id="attraction"
              name="attraction"
              type="text"
              value={attractionValue}
              labelText="Atrakcje"
              placeholder="---"
              style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
              handleChange={(e) => setAttractionValue(e.target.value)}
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

          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
            <Input
              id="extraAttraction"
              name="extraAttraction"
              type="text"
              value={extraAttractionValue}
              labelText="Dodatekowe atrakcje"
              placeholder="---"
              style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
              handleChange={(e) => setExtraAttractionValue(e.target.value)}
            />

            <BsFillBookmarkPlusFill style={{ fill: "green", marginLeft: "30px" }} onClick={handleExtraAttraction} />
          </div>
          {extraAttraction.length > 0 && (
            <div className="create__event--attractions">
              <h6>Max 8 atrakcjii</h6>
              <ul style={{ width: "100%" }}>
                {extraAttraction.map((attr, i) => (
                  <li key={i} style={{ display: "flex", width: "100%" }}>
                    <h4>{attr}</h4>
                    <AiFillDelete style={{ fill: "red" }} onClick={() => deleteExtraAttraction(i)} />
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div style={{ marginTop: "20px" }}>
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
          <div style={{ margin: "40px 0px" }}>
            <Button
              label={`${loading ? "Wysyłanie..." : "Wyślij"}`}
              className="auth-button button"
              disabled={!name || !eventType || !startDate || !endDate || !price}
              handleClick={updateClient}
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default EditEvent;
