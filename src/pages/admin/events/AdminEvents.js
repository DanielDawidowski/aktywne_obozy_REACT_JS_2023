import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineEdit } from "react-icons/ai";

import { eventService } from "@service/api/events/events.service";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { Utils } from "@service/utils/utils.service";

function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [currentPage] = useState(1);
  const dispatch = useDispatch();

  const getAllEvents = useCallback(async () => {
    try {
      const response = await eventService.getAllEvents(currentPage);
      setEvents(response.data.events);
      // console.log("response", response.data.events);
    } catch (error) {
      console.log("error", error);
    }
  }, [currentPage]);

  const deleteClient = async (eventId) => {
    const result = confirm("Czy na pewno chcesz usunąć?");
    if (result) {
      try {
        const response = await eventService.deleteEvent(eventId);
        Utils.dispatchNotification(response.data.message, "success", dispatch);
        // console.log("response", response);
        getAllEvents();
        return response;
      } catch (error) {
        Utils.dispatchNotification(error?.response?.data.message, "error", dispatch);
      }
    }
  };

  useEffect(() => {
    getAllEvents();
  }, [getAllEvents]);

  const sortedList = useMemo(() => {
    return events.sort();
  }, [events]);

  return (
    <div className="admin__main--events">
      {sortedList.map((event, index) => (
        <div key={index} className="admin__main--events--item">
          <h4>{event.name}</h4>
          <div>
            <Link to={`/admin/events/update/${event._id}`}>
              <AiOutlineEdit />
            </Link>
            <MdDeleteForever style={{ fill: "red" }} onClick={() => deleteClient(event._id)} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminEvents;
