import axios from "@service/axios";

class EventService {
  async getAllEvents(page) {
    const response = await axios.get(`/event/all/${page}`);
    return response;
  }

  async getEvent(eventId) {
    const response = await axios.get(`/event/${eventId}`);
    return response;
  }
}

export const eventService = new EventService();
