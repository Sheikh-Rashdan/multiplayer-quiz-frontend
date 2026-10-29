import axios, { AxiosError } from "axios";

export async function login(username, password) {
  try {
    const response = await axios.post("http://127.0.0.1:8000/users/login",
      { username, password }
    );

    const authToken = response.data["token"];
    return [true, authToken];

  } catch (error) {

    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        return [false, "Invalid username or password!"];
      }
    }

    throw error;
  }
}

export async function signup(username, password) {
  try {
    const response = await axios.post("http://127.0.0.1:8000/users/signup", { username, password });
    if (response.status === 200)
      return login(username, password);
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 409) {
        return [false, "Username already exists!"];
      }
    }
    throw error;
  }
}