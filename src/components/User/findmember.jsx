import { useState } from "react";
import { getQueryParams } from "../../functions/libs/getQueryParams";
import { useEffect } from "react";
import { fetchMemberByEmail } from "../../functions/API/fetchMember";
import { fetchPaymentsMember } from "../../functions/API/fetchPayment";
import { Pagination, Spinner, Table } from "flowbite-react";
import { formatRupiah } from "../../functions/libs/formatRupiah";
import AlertError from "../reusable/error";

export const FindMember = () => {
  const [member, setMember] = useState();
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const email = getQueryParams("member");
  useEffect(() => {
    setIsLoading(true);

    const fetch = async () => {
      try {
        const memberData = await fetchMemberByEmail(email);
        const paymentData = await fetchPaymentsMember(email, `?page=${currentPage}`);
        setMember(memberData.data.data.member);
        setItems(paymentData.data.data.payments);
        setTotalItems(paymentData.data.data.total_items);
        setTotalPages(paymentData.data.data.total_page);
        setIsLoading(false);
      } catch (error) {
        setError(error.response.data.message);
        setIsLoading(false);
      }
    };
    fetch();
  }, [currentPage]);
  return (
    <section class="">
      {error ? (
        <div class="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
          <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">Pencarian gagal</h1>
          <p class="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">{error}</p>
        </div>
      ) : member ? (
        <div class="px-4 mx-auto max-w-screen-xl text-center py-10">
          <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">Halo, {member.name}</h1>
          <p class="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
            Berikut adalah data detail anda terkait status membership dan histori pembayaran anda. Jika dirasa ada data yang tidak sesuai, anda bisa menyampaikan hal tersebut ke staff kami.
          </p>
          <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">Terimakasih.</p>
          <div className="flex w-full justify-center">
            <div class="w-full md:w-4/5 lg:w-2/5 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-start">
              <h5 class="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">Detail Member</h5>
              <label className="text-xl font-semibold">Nama</label>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{member.name}</p>
              <label className="text-xl font-semibold">Email</label>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{member.email}</p>
              <label className="text-xl font-semibold">Status Membership</label>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{member?.membership?.status ? "ACTIVE" : "INACTIVE"}</p>
              <label className="text-xl font-semibold">Masa Berlaku</label>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{new Date(member?.membership?.active_until).toLocaleString()}</p>
            </div>
          </div>
          <div className="mt-10 bg-white rounded-xl">
            <p className="text-2xl font-bold py-4">Detail Pembayaran</p>
            <div className="overflow-x-auto   ">
              <Table hoverable>
                <Table.Head>
                  <Table.HeadCell>Nama</Table.HeadCell>
                  <Table.HeadCell>Email</Table.HeadCell>
                  <Table.HeadCell>Paket</Table.HeadCell>
                  <Table.HeadCell>Harga</Table.HeadCell>
                  <Table.HeadCell>Staff</Table.HeadCell>
                  <Table.HeadCell>Status</Table.HeadCell>
                  <Table.HeadCell>Tanggal (MM/dd/YYYY)</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {isLoading ? (
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell colSpan={7}>
                        <div className="text-center">
                          <Spinner aria-label="Center-aligned spinner example" />
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ) : items && items.length !== 0 ? (
                    items.map((item) => {
                      return (
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{item?.member?.name}</Table.Cell>
                          <Table.Cell>{item?.member?.email}</Table.Cell>
                          <Table.Cell>{item?.package?.name}</Table.Cell>
                          <Table.Cell>{formatRupiah(item?.total_payments)}</Table.Cell>
                          <Table.Cell>{item?.staff?.name}</Table.Cell>
                          <Table.Cell>{item?.status}</Table.Cell>
                          <Table.Cell>{new Date(item?.updatedAt).toLocaleString()}</Table.Cell>
                        </Table.Row>
                      );
                    })
                  ) : (
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell colSpan={7}>
                        <AlertError error={"Data pembayaran tidak ditemukan"} layer={"text-center py-4"} font={"text-lg font-bold"} />
                      </Table.Cell>
                    </Table.Row>
                  )}
                </Table.Body>
              </Table>
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} className="py-4" color="dark" />
            </div>
          </div>
        </div>
      ) : (
        <div class="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
          <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">Proses sedang berlangsung...</h1>
          <p class="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">Mohon tunggu sebentar. Proses pencarian data sedang berlangsung dan membutuhkan beberapa waktu.</p>
        </div>
      )}
    </section>
  );
};
