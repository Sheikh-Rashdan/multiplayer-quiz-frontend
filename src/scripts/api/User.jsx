import axios, { AxiosError } from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export async function login(username, password) {
  try {
    const response = await axios.post(`${apiUrl}/users/login`,
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
    const response = await axios.post(`${apiUrl}/users/signup`, { username, password });
    if (response.status === 201)
      return await login(username, password);
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 409) {
        return [false, "Username already exists!"];
      }
    }
    throw error;
  }
}

export async function getMe(backToLogin, authToken) {
  try {
    const response = await axios.get(`${apiUrl}/users/me`,
      { "headers": { "Authorization": `Bearer ${authToken}` } })
    if (response.status === 200) {
      const user = response.data;
      return user;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        backToLogin();
        return;
      }
    }
    throw error;
  }
}

export async function getUserFromId(user_id) {
  try {
    const response = await axios.get(`${apiUrl}/users/${user_id}`);
    const user = response.data;
    return user;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.status == 404) {
        return;
      }
    }
    throw error;
  }
}