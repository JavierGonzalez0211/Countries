import axios from "axios";

export default function postActivity(data) {
  return async function () {
    try {
      await axios.post(`http://localhost:3001/activity`, data);
    } catch (error) {
      return error;
    }
  };
}