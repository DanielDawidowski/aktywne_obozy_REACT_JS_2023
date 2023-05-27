import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { eventService } from "@service/api/events/events.service";
import Layout from "@components/layout/Layout";

import Events1 from "@assets/Images/morskie_2023.jpg";
import Events2 from "@assets/Images/krakow_2023.jpg";
import Events3 from "@assets/Images/gory_2023.jpg";
import Carousel from "@components/carousel/Carousel";

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
  }, [getAllEvents]);

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0, transition: { duration: 1.5 } }}
        exit={{ opacity: 0, x: 100, transition: { duration: 1.5 } }}
      >
        {events.map((event, index) => (
          <div style={{ marginTop: "20px" }} key={index}>
            <Link to={`/event/${event._id}`}>{event.name}</Link>
          </div>
        ))}
        <Carousel slides={eventSlides} />
      </motion.div>
    </Layout>
  );
}

export default Events;
