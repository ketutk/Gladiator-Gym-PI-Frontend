import axios from "axios";

export async function fetchPackage() {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/package/`);

    return response;
  } catch (error) {
    throw error;
  }
}
