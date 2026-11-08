import axios, { AxiosError } from "axios";

export async function getRoom(roomCode) {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/rooms/${roomCode}`);
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
    const response = await axios.post(`http://127.0.0.1:8000/rooms`,
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