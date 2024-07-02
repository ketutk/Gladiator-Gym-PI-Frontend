import { downloadExcel } from "react-export-table-to-excel";
import { fetchAllPayment } from "../API/fetchPayment";
export function handleDownloadExcel(name, header, data) {
  downloadExcel({
    fileName: name,
    sheet: "payments1",
    tablePayload: {
      header,
      // accept two different data structures
      body: data,
    },
  });
}

export async function handleDownloadExcelPayments(name, query, token) {
  try {
    const response = await fetchAllPayment(query, token);
    const header = ["Nama Member", "Email Member", "No. Telp. Member", "Nama Staff", "Email Staff", "Nama Paket", "Total Dibayar", "Metode Pembayaran", "Tanggal Pembayaran"];
    handleDownloadExcel(name, header, response.data.data.data);
  } catch (error) {
    throw error;
  }
}
