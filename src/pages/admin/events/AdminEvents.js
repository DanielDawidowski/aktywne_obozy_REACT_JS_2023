import React, { useState, useEffect, useCallback } from "react";
import { AiOutlineEdit } from "react-icons/ai";

import { eventService } from "@service/api/events/events.service";
import { Link } from "react-router-dom";

function AdminEvents() {
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
    <>
      {events.map((event, index) => (
        <div key={index}>
          {event.name}
          <Link to={`/admin/events/update/${event._id}`}>
            <AiOutlineEdit />
          </Link>
        </div>
      ))}
    </>
  );
}

export default AdminEvents;
