import axios from "axios";

export async function fetchPayment(query, token) {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/payments${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}
export async function fetchAddPayment(data, token) {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/payments/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}
