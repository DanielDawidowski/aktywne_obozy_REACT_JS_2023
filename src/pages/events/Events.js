import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { eventService } from "@service/api/events/events.service";
import Layout from "@components/layout/Layout";

function Events() {
  const [events, setEvents] = useState([]);
  const [currentPage] = useState(1);

  const getAllPosts = useCallback(async () => {
    try {
      const response = await eventService.getAllEvents(currentPage);
      setEvents(response.data.events);
      console.log("response", response.data.events);
    } catch (error) {
      console.log("error", error);
    }
  }, [currentPage]);

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  return (
    <Layout>
      {events.map((event) => {
        return (
          <div style={{ marginTop: "20px" }} key={event?._id}>
            <Link to={`/event/${event._id}`}>{event.event}</Link>
          </div>
        );
      })}
    </Layout>
  );
}

export default Events;
