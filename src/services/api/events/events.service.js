import axios from "@service/axios";

class EventService {
  async createEvent(body) {
    const response = await axios.post("/event", body);
    return response;
  }

  async createEventWithImage(body) {
    const response = await axios.post("/event/image/event", body);
    return response;
  }

  async getAllEvents(page) {
    const response = await axios.get(`/event/all/${page}`);
    return response;
  }

  async getEvent(eventId) {
    const response = await axios.get(`/event/${eventId}`);
    return response;
  }

  async updateEvent(eventId, body) {
    const response = await axios.put(`/event/${eventId}`, body);
    return response;
  }
}

export const eventService = new EventService();
