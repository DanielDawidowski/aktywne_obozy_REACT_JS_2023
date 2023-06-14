import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "@pages/contact/Contact.scss";
import Layout from "@components/layout/Layout";
import Button from "@components/button/Button";
import { Utils } from "@service/utils/utils.service";
import Input from "@components/input/Input";
import { emailService } from "@service/api/email.js/email.service";
import Image from "@components/image/Image";
import ContactImg from "@assets/Images/contact-image.jpg";

const questionArr = [
  {
    id: 1,
    question: "How do I get started?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id."
  },
  {
    id: 2,
    question: "Can I cancel my subscription?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id."
  },
  {
    id: 3,
    question: "Do you provide additional support?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id."
  }
];

const initialState = {
  username: "",
  email: "",
  message: ""
};

function Contact() {
  const [values, setValues] = useState(initialState);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState();
  const { username, email, message } = values;

  const dispatch = useDispatch();

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      const response = await emailService.sendMessage(values);
      Utils.dispatchNotification(response.data.message, "success", dispatch);
      setLoading(false);
      setHasError(false);
      setValues(initialState);
      return response;
    } catch (error) {
      setLoading(false);
      setHasError(true);
      setErrorMessage(error?.response?.data.message);
      Utils.dispatchNotification(errorMessage, "error", dispatch);
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleToggle = (id) => {
    setToggle(toggle !== id ? id : null);
  };

  return (
    <Layout>
      <div className="contact container">
        <div className="contact__form">
          <div className="contact__form--wrapper">
            <form>
              <Input
                id="username"
                name="username"
                type="text"
                value={username}
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
              <label htmlFor="message">Wiadomość</label>
              <textarea
                id="message"
                name="message"
                type="textarea"
                value={message}
                style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
                onChange={handleChange}
                placeholder="---"
                rows={6}
              />
              <Button
                label={`${loading ? "Wysyłanie..." : "Wyślij"}`}
                className="auth-button button"
                disabled={!username || !email || !message}
                handleClick={sendMessage}
              />
            </form>
          </div>
          <div className="contact__form--image">
            <Image src={ContactImg} alt="contact" />
          </div>
        </div>
        <div className="contact__questions">
          <div className="contact__questions--header">
            <h1>?</h1>
            <h2>
              Najczęściej <br /> zadawane pytania
            </h2>
          </div>
          <div className="contact__questions--body">
            {questionArr.map((item, i) => (
              <div key={i} className="contact__questions--body--item">
                <h3 onClick={() => handleToggle(item.id)}>{item.question}</h3>
                {toggle === item.id && <p>{item.answer}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Contact;
