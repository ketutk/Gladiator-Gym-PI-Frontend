import axios from "axios";

export async function fetchDashboardData(token) {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/dashboard/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}
export async function fetchTransactionsByPackage(token) {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/dashboard/transactions/packages`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}
