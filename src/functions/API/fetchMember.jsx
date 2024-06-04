import axios from "axios";

export async function fetchMember(query, token) {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/member${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}
export async function fetchAllMember(token) {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/member/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}

export async function fetchAddMember(data, token) {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/member/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}
export async function fetchUpdateMember(id, data, token) {
  try {
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/member/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}
export async function fetchDeleteMember(id, token) {
  try {
    const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/member/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}
