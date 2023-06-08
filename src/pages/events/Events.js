import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { eventService } from "@service/api/events/events.service";
import Layout from "@components/layout/Layout";
import Events1 from "@assets/Images/morskie_2023.jpg";
import Events2 from "@assets/Images/krakow_2023.jpg";
import Events3 from "@assets/Images/gory_2023.jpg";
import Carousel from "@components/carousel/Carousel";
import "@pages/events/Events.scss";
import { EventUtils } from "@service/utils/event-utils.service";
import Calendar from "@assets/SVG/calendar";
import { TimeAgo } from "@service/utils/timeago.utils";

const eventSlides = [
  {
    id: 0,
    image: Events1
  },
  {
    id: 1,
    image: Events2
  },
  {
    id: 2,
    image: Events3
  }
];

function Events() {
  const [events, setEvents] = useState([]);
  const [currentPage] = useState(1);
  const [toggle, setToggle] = useState();

  const getAllEvents = useCallback(async () => {
    try {
      const response = await eventService.getAllEvents(currentPage);
      setEvents(response.data.events);
      // console.log("response", response.data.events);
    } catch (error) {
      console.log("error", error);
    }
  }, [currentPage]);

  useEffect(() => {
    getAllEvents();
    if (events) {
      console.log("events", events);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAllEvents]);

  const handleToggle = (name) => {
    setToggle(toggle !== name ? name : null);
  };

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
        exit={{ opacity: 0, x: 10, transition: { duration: 0.5 } }}
        className="events"
      >
        {events.map((event) => (
          <motion.div
            key={event._id}
            className="events__item"
            style={{ background: EventUtils.showEventColor(event.eventType) }}
          >
            <motion.div className="events__item--inner">
              {toggle !== event.name && (
                <motion.div onClick={() => handleToggle(event.name)} className="events__item--header">
                  <img src={EventUtils.showEventIcon(event.eventType)} alt={event.name} />
                  <div className="center">
                    <h2>{event.name}</h2>
                    <h3>
                      {event.status === "active" ? (
                        <span className="active__event">Aktualne</span>
                      ) : (
                        <span className="not--active__event">Nieaktualne</span>
                      )}
                    </h3>
                  </div>
                </motion.div>
              )}
              {toggle === event.name && (
                <motion.div
                  initial={{ opacity: 0, height: "0%" }}
                  animate={{ opacity: 1, height: "100%", transition: { duration: 1.5 } }}
                  exit={{ opacity: 0, height: "0%", transition: { duration: 1.5 } }}
                  className="events__item--body"
                >
                  <img src={event.image} alt={event.name} onClick={() => handleToggle(event.name)} />

                  <h3 onClick={() => handleToggle(event.name)}>{event.name}</h3>
                  <div className="events__item--calendars">
                    <div className="events__item--calendar">
                      <Calendar color="#5cb85c" />
                      <div>
                        <h3 style={{ color: "green" }}>Zaczynamy</h3>
                        <h3>{TimeAgo.dayMonthYear(event.startDate)}</h3>
                      </div>
                    </div>
                    <div className="events__item--calendar">
                      <Calendar color="#f94144" />
                      <div>
                        <h3 style={{ color: "red" }}>Kończymy</h3>
                        <h3>{TimeAgo.dayMonthYear(event.endDate)}</h3>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
            {toggle === event.name && (
              <motion.div className="events__item--footer">
                <img src={EventUtils.showEventIcon(event.eventType)} alt={event.name} />
                <Link to={`/event/${event._id}`}>Zobacz</Link>
              </motion.div>
            )}
          </motion.div>
        ))}
        <div className="events__carousel">
          <Carousel slides={eventSlides} />
        </div>
      </motion.div>
    </Layout>
  );
}

export default Events;
