import axios from 'axios';

const baseURL = 'http://localhost:8080/';

export const fetchAttendees = () => axios.get(`${baseURL}attendees`);
