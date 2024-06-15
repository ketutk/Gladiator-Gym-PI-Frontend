import { useState } from "react";
import { getQueryParams } from "../../functions/libs/getQueryParams";
import { useEffect } from "react";
import { fetchMemberByEmail } from "../../functions/API/fetchMember";
import { fetchPaymentsMember } from "../../functions/API/fetchPayment";
import { Button, Pagination, Spinner, Table } from "flowbite-react";
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
  const [showPayment, setShowPayment] = useState(false);

  const email = getQueryParams("member");
  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
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
        <div class="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-30">
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
              <Button color="dark" className="mx-auto" onClick={() => (showPayment ? setShowPayment(false) : setShowPayment(true))} href="#payment">
                {showPayment ? "Sembunyikan pembayaran" : "Tampilkan pembayaran"}
              </Button>
            </div>
          </div>
          {showPayment && (
            <div className="mt-10 bg-white rounded-xl" id="payment">
              <p className="text-2xl font-bold py-4">Detail Pembayaran</p>
              <div className="overflow-x-auto   ">
                <Table hoverable>
                  <Table.Head>
                    <Table.HeadCell>Nama</Table.HeadCell>
                    <Table.HeadCell>Email</Table.HeadCell>
                    <Table.HeadCell>Paket</Table.HeadCell>
                    <Table.HeadCell>Harga</Table.HeadCell>
                    <Table.HeadCell>Staff</Table.HeadCell>
                    <Table.HeadCell>Metode</Table.HeadCell>
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
                            <Table.Cell>{item?.payment_method}</Table.Cell>
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
          )}
        </div>
      ) : (
        <div class="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
          <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">Proses sedang berlangsung...</h1>
          <p class="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">Mohon tunggu sebentar. Proses pencarian data sedang berlangsung dan membutuhkan beberapa waktu.</p>
        </div>
      )}
      <footer class="bg-gray-900 text-white py-8 w-full">
        <div class="w-full flex flex-row items-center justify-center px-4">
          <div class="flex flex-col md:flex-row justify-between mt-10 w-full md:basis-3/4">
            <div class="mb-4 md:mb-0 flex flex-col basis-1/3 gap-y-3">
              <p class="text-lg font-extrabold">Tentang kami</p>
              <p className="text-wrap">Ruko dasana xentre blok BD no 20-22, Bojong Nangka, Kelapa Dua, Tangerang Regency, Banten 15810</p>
              <a className="text-wrap" href="https://wa.me/6281314206253">
                Contact : <span className="font-semibold italic">Click Here (WA)</span>
              </a>
            </div>
            <div class="mb-4 md:mb-0 flex flex-col md:items-center basis-1/3 ">
              <div className="flex flex-col gap-y-3">
                <p class="text-lg font-extrabold">Halaman</p>
                <a href="/" className="hover:underline">
                  Homepage
                </a>
                <a href="/#findmember" className="hover:underline">
                  Detail Member
                </a>
                <a href="/login" className="hover:underline">
                  Login
                </a>
              </div>
            </div>

            <div class="mb-4 md:mb-0 flex flex-col basis-1/3 ">
              <p class="text-lg font-extrabold">
                Media Pembayaran
                <span className="text-gray-400"> (On-Site)</span>
              </p>
              <p className="text-wrap">Tersedia pembayaran On-Site melalui : </p>
              <ul class="max-w-md space-y-1  list-inside ">
                <li class="flex items-center">
                  <svg class="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                  </svg>
                  Transfer (BCA)
                </li>
                <li class="flex items-center">
                  <svg class="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                  </svg>
                  Debit (BCA)
                </li>
                <li class="flex items-center">
                  <svg class="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                  </svg>
                  Cash
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="mt-8 text-center text-gray-400">
          <p>&copy; 2024 Gladiator Gym. All rights reserved.</p>
        </div>
      </footer>
    </section>
  );
};
