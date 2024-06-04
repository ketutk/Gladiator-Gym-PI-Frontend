import axios from "axios";

export async function fetchPackage(token) {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/package/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}
