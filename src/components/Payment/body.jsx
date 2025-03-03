import { Table, Dropdown } from "flowbite-react";
import AlertError from "../reusable/error";
import { fetchDeleteMember } from "../../functions/API/fetchMember";
import { useState } from "react";
import { ShowPayment } from "./showPayment";
import { formatRupiah } from "../../functions/libs/formatRupiah";

export const Body = ({ data, setCurrentPage, setShouldRefetch, token }) => {
  const [item, setItem] = useState();
  return (
    <>
      {data &&
        data.map((item, index) => {
          return (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{item?.member?.name}</Table.Cell>
              <Table.Cell>{item?.member?.email || item?.member?.phone}</Table.Cell>
              <Table.Cell>{item?.package?.name}</Table.Cell>
              <Table.Cell>{formatRupiah(item?.total_payments)}</Table.Cell>
              <Table.Cell>{item?.staff?.name || "NULL"}</Table.Cell>
              <Table.Cell>{item?.payment_method}</Table.Cell>
              <Table.Cell>{new Date(item?.createdAt).toLocaleString()}</Table.Cell>
              <Table.Cell>
                <Dropdown label={<span className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">Pilih</span>} inline placement={`${data.length === 1 ? "left" : "bottom"}`}>
                  <Dropdown.Item onClick={() => setItem(item)}>
                    <span>Lihat</span>
                  </Dropdown.Item>
                </Dropdown>
              </Table.Cell>
            </Table.Row>
          );
        })}
      {item && <ShowPayment item={item} setItem={setItem} />}
      {data.length === 0 && (
        <Table.Row>
          <Table.Cell colSpan={8}>
            <AlertError error={"Data tidak ditemukan"} layer={"text-center py-4"} />
          </Table.Cell>
        </Table.Row>
      )}
    </>
  );
};
