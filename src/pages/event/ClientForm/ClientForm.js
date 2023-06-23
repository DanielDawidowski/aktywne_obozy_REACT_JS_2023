import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { BsInfoSquare } from "react-icons/bs";
import Calendar from "@assets/SVG/calendar";
import { TimeAgo } from "@service/utils/timeago.utils";
import Button from "@components/button/Button";
import Input from "@components/input/Input";
import "@pages/event/ClientForm/ClientForm.scss";

const ClientForm = ({ event, values, handleChange, createClient, checked, loading, hasError }) => {
  const { name, email, tel, birthDate, price } = values;

  return (
    <div className="event__form">
      <div className="event__form--inner">
        <div className="event__form--wrapper">
          <div className="event__form--wrapper--header">
            <h2>{event.name}</h2>
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
                      {`${event.price} PLN ---  cena bez dofinansowania KRUS`}{" "}
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
                    <h5
                      style={{ color: checked === "discountPrice" ? "#f3722c" : "#333333" }}
                    >{`${event.discountPrice} PLN cena z dofinansowaniem KRUS`}</h5>
                  }
                  placeholder="---"
                  style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
                  handleChange={handleChange}
                  checked={checked === "discountPrice"}
                />
              </div>
              {checked === "discountPrice" && (
                <motion.div
                  className="event__form--info"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: checked === "discountPrice" && "100%" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <BsInfoSquare style={{ fill: "#f94144" }} />
                  <p>
                    Z wypoczynku letniego mogą skorzystać dzieci i młodzież z terenu województwa warmińsko- mazurskiego
                    i podlaskiego urodzonych po 1 stycznia 2007 r., których co najmniej jedno z rodziców lub prawnych
                    opiekunów jest ubezpieczone w pełnym zakresie (jednocześnie posiada ubezpieczenie emerytalną –
                    rentowe oraz wypadkowe, chorobowe i macierzyńskie) lub pobiera rentę bądź emeryturę z Kasy
                    Rolniczego Ubezpieczenia Społecznego.
                  </p>
                </motion.div>
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
    </div>
  );
};

ClientForm.propTypes = {
  event: PropTypes.object,
  values: PropTypes.object,
  handleChange: PropTypes.func,
  createClient: PropTypes.func,
  checked: PropTypes.string,
  loading: PropTypes.bool,
  hasError: PropTypes.bool
};

export default ClientForm;
