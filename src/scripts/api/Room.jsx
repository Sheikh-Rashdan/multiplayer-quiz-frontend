import axios, { AxiosError } from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export async function getRoom(roomCode) {
  try {
    const response = await axios.get(`${apiUrl}/rooms/${roomCode}`);
    const room = response.data;
    return room;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.status === 404) {
        return;
      }
    }

    throw error;
  }
}

export async function createRoom(backToLogin, authToken, quiz_id) {
  try {
    const response = await axios.post(`${apiUrl}/rooms`,
      { quiz_id },
      { "headers": { "Authorization": `Bearer ${authToken}` } });
    const room = response.data;
    return room.id;
  } catch (error) {
    if (error instanceof AxiosError) {
      if ([401, 403, 404].includes(error.status)) {
        backToLogin();
        return;
      }
    }

    throw error;
  }
}