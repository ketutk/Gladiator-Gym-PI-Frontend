import { Table, Dropdown } from "flowbite-react";
import AlertError from "../reusable/error";
import { fetchDeleteMember } from "../../functions/API/fetchMember";
import { ShowMember } from "./showMember";
import { useState } from "react";
import { fetchDeleteAdmin } from "../../functions/API/fetchUser";

export const Body = ({ data, setCurrentPage, setShouldRefetch, token }) => {
  const [item, setItem] = useState();
  const handleDelete = async (id) => {
    const confirmation = window.confirm("Apakah anda yakin ingin menghapus data ini ?");
    if (confirmation) {
      try {
        const response = await fetchDeleteAdmin(id, token);
        window.alert("Berhasil menghapus data");
        setCurrentPage(1);
        setShouldRefetch(true);
      } catch (error) {
        window.alert(error.response.data.message);
      }
    }
  };
  return (
    <>
      {data &&
        data.map((item, index) => {
          return (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{item.name}</Table.Cell>
              <Table.Cell>{item?.email || "NULL"}</Table.Cell>
              <Table.Cell>{item?.profile?.phone || "NULL"}</Table.Cell>
              <Table.Cell>{item?.profile?.address}</Table.Cell>
              <Table.Cell>{item?.profile?.ktp_id}</Table.Cell>
              <Table.Cell>
                <Dropdown label={<span className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">Pilih</span>} inline placement={`${data.length === 1 ? "left" : "bottom"}`}>
                  <Dropdown.Item onClick={() => setItem(item)}>
                    <span>Lihat</span>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={(e) => handleDelete(item.id)}>
                    <span>Hapus</span>
                  </Dropdown.Item>
                </Dropdown>
              </Table.Cell>
            </Table.Row>
          );
        })}
      {item && <ShowMember item={item} setItem={setItem} />}
      {data.length === 0 && (
        <Table.Row>
          <Table.Cell colSpan={6}>
            <AlertError error={"Data tidak ditemukan"} layer={"text-center py-4"} />
          </Table.Cell>
        </Table.Row>
      )}
    </>
  );
};
