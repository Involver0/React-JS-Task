import axios from 'axios';

const baseURL = 'http://localhost:8080/';

export const fetchAttendees = () => axios.get(`${baseURL}attendees`);

export const createAttendees = (body) =>
  axios.post(`${baseURL}attendees`, body);

export const deleteAttendee = (id) => axios.delete(`${baseURL}attendees/${id}`);
