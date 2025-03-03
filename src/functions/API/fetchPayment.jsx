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
export async function fetchAllPayment(query, token) {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/payments/all${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}
export async function fetchPaymentsMember(email, query) {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/payments/member/${email}${query}`);

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
