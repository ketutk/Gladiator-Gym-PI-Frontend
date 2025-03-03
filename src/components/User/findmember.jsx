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
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{member?.membership?.status ? "AKTIF" : "NON-AKTIF"}</p>
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
              </div>
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} className="py-4" color="dark" previousLabel="Sebelum" nextLabel="Selanjutnya" />
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
              <a className="text-wrap flex items-center gap-x-2" href="https://wa.me/6281314206253">
                Kontak : <span className="font-semibold italic">Klik Disini (WA)</span>
                <svg width="20px" height="20px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16 31C23.732 31 30 24.732 30 17C30 9.26801 23.732 3 16 3C8.26801 3 2 9.26801 2 17C2 19.5109 2.661 21.8674 3.81847 23.905L2 31L9.31486 29.3038C11.3014 30.3854 13.5789 31 16 31ZM16 28.8462C22.5425 28.8462 27.8462 23.5425 27.8462 17C27.8462 10.4576 22.5425 5.15385 16 5.15385C9.45755 5.15385 4.15385 10.4576 4.15385 17C4.15385 19.5261 4.9445 21.8675 6.29184 23.7902L5.23077 27.7692L9.27993 26.7569C11.1894 28.0746 13.5046 28.8462 16 28.8462Z"
                    fill="#BFC8D0"
                  />
                  <path
                    d="M28 16C28 22.6274 22.6274 28 16 28C13.4722 28 11.1269 27.2184 9.19266 25.8837L5.09091 26.9091L6.16576 22.8784C4.80092 20.9307 4 18.5589 4 16C4 9.37258 9.37258 4 16 4C22.6274 4 28 9.37258 28 16Z"
                    fill="url(#paint0_linear_87_7264)"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2C8.26801 2 2 8.26801 2 16C2 18.5109 2.661 20.8674 3.81847 22.905L2 30L9.31486 28.3038C11.3014 29.3854 13.5789 30 16 30ZM16 27.8462C22.5425 27.8462 27.8462 22.5425 27.8462 16C27.8462 9.45755 22.5425 4.15385 16 4.15385C9.45755 4.15385 4.15385 9.45755 4.15385 16C4.15385 18.5261 4.9445 20.8675 6.29184 22.7902L5.23077 26.7692L9.27993 25.7569C11.1894 27.0746 13.5046 27.8462 16 27.8462Z"
                    fill="white"
                  />
                  <path
                    d="M12.5 9.49989C12.1672 8.83131 11.6565 8.8905 11.1407 8.8905C10.2188 8.8905 8.78125 9.99478 8.78125 12.05C8.78125 13.7343 9.52345 15.578 12.0244 18.3361C14.438 20.9979 17.6094 22.3748 20.2422 22.3279C22.875 22.2811 23.4167 20.0154 23.4167 19.2503C23.4167 18.9112 23.2062 18.742 23.0613 18.696C22.1641 18.2654 20.5093 17.4631 20.1328 17.3124C19.7563 17.1617 19.5597 17.3656 19.4375 17.4765C19.0961 17.8018 18.4193 18.7608 18.1875 18.9765C17.9558 19.1922 17.6103 19.083 17.4665 19.0015C16.9374 18.7892 15.5029 18.1511 14.3595 17.0426C12.9453 15.6718 12.8623 15.2001 12.5959 14.7803C12.3828 14.4444 12.5392 14.2384 12.6172 14.1483C12.9219 13.7968 13.3426 13.254 13.5313 12.9843C13.7199 12.7145 13.5702 12.305 13.4803 12.05C13.0938 10.953 12.7663 10.0347 12.5 9.49989Z"
                    fill="white"
                  />
                  <defs>
                    <linearGradient id="paint0_linear_87_7264" x1="26.5" y1="7" x2="4" y2="28" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#5BD066" />
                      <stop offset="1" stop-color="#27B43E" />
                    </linearGradient>
                  </defs>
                </svg>
              </a>
            </div>
            <div class="mb-4 md:mb-0 flex flex-col md:items-center basis-1/3 ">
              <div className="flex flex-col gap-y-3">
                <p class="text-lg font-extrabold">Halaman</p>
                <a href="/" className="hover:underline">
                  Beranda
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
