import React, { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Layout from "@components/layout/Layout";
import { eventService } from "@service/api/events/events.service";
import { clientService } from "@service/api/clients/clients.service";
import { GoBackButton } from "@components/go-back-button/goBackButton";
import useEffectOnce from "@hooks/useEffectOnce";
import Image from "@components/image/Image";
import Information from "@components/information/Information";
import { EventUtils } from "@service/utils/event-utils.service";
import Energylandia from "@assets/Images/energylandia.jpg";
import Divider from "@components/divider/Divider";
import HotelSVG from "@assets/SVG/hotel";
import PeopleSVG from "@assets/SVG/people";
import TransportSVG from "@assets/SVG/transport";
import InsurenceSVG from "@assets/SVG/insurence";
import { Utils } from "@service/utils/utils.service";
import RandomIcons from "@components/randomIcons/RandomIcons";
import ClientForm from "@pages/event/ClientForm/ClientForm";
import "@pages/event/Event.scss";

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
  const dispatch = useDispatch();

  const { eventType, address } = event;

  const { eventId } = useParams();

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
      Utils.dispatchNotification(response.data.message, "success", dispatch);
      setLoading(false);
      setHasError(false);
      setValues(initialState);
      setChecked("");
      return response;
    } catch (error) {
      setLoading(false);
      setHasError(true);
      setErrorMessage(error?.response?.data.message);
      Utils.dispatchNotification(errorMessage, "error", dispatch);
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
            <Image src={event.image} alt="event" />
            <div className="event__body--title">
              <Information location>
                <div className="event__body--address">{EventUtils.showAddress(address)}</div>
              </Information>
            </div>
          </div>

          <div className="event__body--icons">
            <RandomIcons flex num={6} size="small" />
          </div>
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
                <RandomIcons grid num={2} />
              </div>
              <ul className="event__body--attractions--center">
                {event.extraAttractions &&
                  event.extraAttractions.map((attraction, index) => (
                    <li key={index}>
                      <div className="dot"></div>
                      <h4>{attraction}</h4>
                    </li>
                  ))}
              </ul>
              <div className="event__body--attractions--right">
                <RandomIcons grid num={2} />
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
            <div className="event__body--bon--image"></div>
            <h3>Realizujemy bony turystyczne</h3>
            <Divider />
          </div>

          <div className="event__bottom--small">
            <RandomIcons flex num={2} />
          </div>
          <div className="event__bottom--big">
            <RandomIcons grid num={8} size="big" />
          </div>
        </div>
        <ClientForm
          event={event}
          values={values}
          handleChange={handleChange}
          createClient={createClient}
          checked={checked}
          loading={loading}
          hasError={hasError}
        />
      </section>
    </Layout>
  );
}

export default Event;
