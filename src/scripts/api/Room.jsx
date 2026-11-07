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