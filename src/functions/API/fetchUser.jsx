import axios from "axios";

export async function fetchLogin(email, password) {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/auth/login`, {
      email,
      password,
    });

    return response;
  } catch (error) {
    throw error;
  }
}
export async function fetchWhoami(token) {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/auth/whoami`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}
export async function fetchUpdateProfile(data, token) {
  try {
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/auth/profile`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}
export async function fetchChangePassword(data, token) {
  try {
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/auth/password`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}
export async function fetchAddAdmin(data, token) {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/auth/register`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}

export async function fetchAdmin(query, token) {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/auth/user${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}
export async function fetchDeleteAdmin(id, token) {
  try {
    const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/auth/${id}/delete`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}
