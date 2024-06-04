import axios from "axios";

export async function fetchTotalMember(token) {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/dashboard/member`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}
export async function fetchActiveMember(token) {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/dashboard/member/active`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}
export async function fetchTransactions(token) {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/dashboard/transactions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}
export async function fetchTotalTransactions(token) {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/dashboard/transactions/total`, {
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
