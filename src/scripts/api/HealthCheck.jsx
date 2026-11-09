import axios, { AxiosError } from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export async function checkConnection(setNetworkFailure) {
  const networkTimeout = setTimeout(() => setNetworkFailure(true), 2500);
  try {
    await axios.get(apiUrl);
    clearTimeout(networkTimeout);
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.code == "ERR_NETWORK") {
        setNetworkFailure(true);
        return;
      }
    }
    throw error;
  }
}