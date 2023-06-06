import React, { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "@components/layout/Layout";
import Button from "@components/button/Button";
import Input from "@components/input/Input";
import { eventService } from "@service/api/events/events.service";
import { clientService } from "@service/api/clients/clients.service";
import { GoBackButton } from "@components/go-back-button/goBackButton";
import useEffectOnce from "@hooks/useEffectOnce";
import Image from "@components/image/Image";
import Information from "@components/information/Information";
import { TimeAgo } from "@service/utils/timeago.utils";
import { EventUtils } from "@service/utils/event-utils.service";
import EventIcons from "@assets/Images/event-icons.jpg";
import Energylandia from "@assets/Images/energylandia.jpg";
import AttractionImg from "@assets/Images/attraction-image.jpg";
import EventLeft from "@assets/Images/event-left.jpg";
import EventRight from "@assets/Images/event-right.jpg";
import EventBottom from "@assets/Images/event-bottom.jpg";
import BonImg from "@assets/Images/bon.jpg";
import Divider from "@components/divider/Divider";
import HotelSVG from "@assets/SVG/hotel";
import PeopleSVG from "@assets/SVG/people";
import TransportSVG from "@assets/SVG/transport";
import InsurenceSVG from "@assets/SVG/insurence";
import "@pages/events/Event.scss";
import Calendar from "@assets/SVG/calendar";
import { BsInfoSquare } from "react-icons/bs";

// import Dots from "@assets/SVG/Dots";

const initialState = {
  eventId: "",
  eventName: "",
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

  const { eventType, address } = event;

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
    values.eventName = event.name;
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

  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      setValues({ ...values, price: e.target.labels[0].innerHTML });
      setChecked(e.target.name);
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });
      // console.log(e.target.name, " ---- ", e.target.value);
    }
  };

  useEffectOnce(() => {
    getEvent();
    console.log("event", event);

    console.log("event.startDate", new Date(event.startDate));
    console.log("event.endDate", event.endDate);
  });

  return (
    <Layout>
      <section className="event container">
        <div className="event__back">
          <GoBackButton type={eventType} />
        </div>

        <div className="event__body">
          <div className="event__body--header">
            <h1>{event.name}</h1>
            <Image src={event.image} alt="energylandia" />
            <div className="event__body--title">
              <Information location>
                <div className="event__body--address">{EventUtils.showAddress(address)}</div>
              </Information>
            </div>
          </div>

          <div className="event__body--icons">
            <Image src={EventIcons} alt="icons" />
          </div>
          <div className="event__body--content">
            <div className="event__body--info">
              <Information>
                <h2>Organizator zapewnia</h2>
                <Divider />
              </Information>
            </div>
            <div className="event__body--energyland">
              <Image src={Energylandia} alt="Energylandia" />
              <div className="event__body--energyland--info">
                <Information location>
                  <h3>Całodniowa wycieczka do Energylandii</h3>
                  <a href="https://energylandia.pl/">energylandia.pl</a>
                  <Divider />
                </Information>
              </div>
            </div>
            <div className="event__body--attractions">
              <div className="event__body--attractions--wrapper">
                {/* <Dots color="#f7b124" /> */}
                <h3>
                  Wycieczki krajoznawczo <span className="text__decoration">turystyczne</span>
                </h3>
                <Image src={AttractionImg} alt="attractions" />
                <ul className="event__body--attractions--list">
                  {event.attractions &&
                    event.attractions.map((attraction, index) => (
                      <li key={index}>
                        <div className="dot"></div>
                        <h4>{attraction}</h4>
                      </li>
                    ))}
                </ul>
              </div>

              <Divider />
              <h3>
                <span className="text__decoration">Zajęcia</span> poza programem
              </h3>
              <div className="event__body--attractions--free">
                <div className="event__body--attractions--left">
                  <Image src={EventLeft} alt="event-left" />
                </div>
                <ul className="event__body--attractions--center">
                  {event.freeAttractions &&
                    event.freeAttractions.map((attraction, index) => (
                      <li key={index}>
                        <div className="dot"></div>
                        <h4>{attraction}</h4>
                      </li>
                    ))}
                </ul>
                <div className="event__body--attractions--right">
                  <Image src={EventRight} alt="event-right" />
                </div>
              </div>
            </div>
            <div className="event__body--assured">
              <div className="event__body--assured--wrapper">
                <ul className="event__body--assured--list">
                  <li>
                    <PeopleSVG />
                    <h4>przez cały pobyt uczestnicy są pod opieką wykwalifikowanej kadry pedagogicznej</h4>
                  </li>
                  <li>
                    <InsurenceSVG />
                    <h4>opiekę medyczną i ubezpieczenie NNW</h4>
                  </li>
                  <li>
                    <HotelSVG />
                    <h4>nocleg i wyzywienie</h4>
                  </li>
                  <li>
                    <TransportSVG />
                    <h4>transport</h4>
                  </li>
                </ul>
                <Divider />
                <h3>Wszystkie zakładane atrakcje wliczone są w cenę kolonii.</h3>
              </div>
            </div>
            <div className="event__body--bon">
              <Image src={BonImg} alt="bon" />
              <h3>Realizujemy bony turystyczne</h3>
              <Divider />
            </div>
          </div>
          <Image src={EventBottom} alt="event-bottom" />
        </div>
        {hasError && errorMessage && <h4>{errorMessage}</h4>}
        <div className="event__form">
          <div className="event__form--wrapper">
            <div className="event__form--wrapper--header">
              <h1>{event.name}</h1>
              <ul className="event__form--dates">
                <li>
                  <Calendar color="#5cb85c" />
                  <div>
                    <h5>Zaczynamy</h5>
                    {event.startDate && <h4>{TimeAgo.dayMonthYear(event.startDate)}</h4>}
                  </div>
                </li>
                <li>
                  <Calendar color="#f94144" />
                  <div>
                    <h5>Kończymy</h5>
                    {event.endDate && <h4>{TimeAgo.dayMonthYear(event.endDate)}</h4>}
                  </div>
                </li>
              </ul>
              <h2 className="event__form--price">{event.discountPrice} PLN</h2>
            </div>

            <form>
              <div className="form__wrapper">
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
                  type="date"
                  value={birthDate}
                  labelText="Data Urodzenia"
                  placeholder="---"
                  style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
                  handleChange={handleChange}
                />

                <div className="event__form--checkbox">
                  <Input
                    id="price"
                    name="price"
                    type="checkbox"
                    value={price}
                    labelText={
                      <h5 style={{ color: checked === "price" ? "#f3722c" : "#333333" }}>
                        {`${event.price} PLN ${checked === "price" ? " cena bez dofinansowaniem KRUS" : ""}`}{" "}
                      </h5>
                    }
                    placeholder="---"
                    style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
                    handleChange={handleChange}
                    checked={checked === "price"}
                  />
                </div>
                <div className="event__form--checkbox">
                  <Input
                    id="discountPrice"
                    name="discountPrice"
                    type="checkbox"
                    value={price}
                    labelText={
                      <h5 style={{ color: checked === "discountPrice" ? "#f3722c" : "#333333" }}>{`${
                        event.discountPrice
                      } PLN ${checked === "discountPrice" ? "cena z dofinansowaniem KRUS" : ""}`}</h5>
                    }
                    placeholder="---"
                    style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
                    handleChange={handleChange}
                    checked={checked === "discountPrice"}
                  />
                </div>
                {checked === "discountPrice" && (
                  <div className="event__form--info">
                    <BsInfoSquare style={{ fill: "#f94144" }} />
                    <p>
                      Z wypoczynku letniego mogą skorzystać dzieci i młodzież z terenu województwa warmińsko-
                      mazurskiego i podlaskiego urodzonych po 1 stycznia 2007 r., których co najmniej jedno z rodziców
                      lub prawnych opiekunów jest ubezpieczone w pełnym zakresie (jednocześnie posiada ubezpieczenie
                      emerytalną – rentowe oraz wypadkowe, chorobowe i macierzyńskie) lub pobiera rentę bądź emeryturę z
                      Kasy Rolniczego Ubezpieczenia Społecznego.
                    </p>
                  </div>
                )}
              </div>
            </form>
          </div>
          <div className="event__form--buttons">
            <Button
              label={`${loading ? "Wysyłanie..." : "Wyślij"}`}
              className="auth-button button"
              disabled={!name || !email || !tel || !birthDate || !price}
              handleClick={createClient}
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Event;
