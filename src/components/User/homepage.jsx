import { useEffect } from "react";
import { useState } from "react";
import { fetchPackage } from "../../functions/API/fetchPackage";
import { formatRupiah } from "../../functions/libs/formatRupiah";

export const HomePage = () => {
  const [email, setEmail] = useState("");
  const [items, setItems] = useState();
  const [isShowPackage, setIsShowPackage] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await fetchPackage();
        setItems(response.data.data.packages);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    fetch();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    window.location.href = `/find?member=${email}`;
  };
  return (
    <>
      <section class="">
        <div class="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56" id="findmember">
          <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">Selamat datang di Gladiator Gym</h1>
          <p class="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
          <form class="w-full max-w-md mx-auto" onSubmit={handleSubmit}>
            <label for="default-email" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
              Email sign-up
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 rtl:inset-x-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                  <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                  <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                </svg>
              </div>
              <input
                type="email"
                id="default-email"
                class="block w-full p-4 ps-10 text-md text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Masukkan email disini"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                class="text-white absolute end-2.5 bottom-2.5 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-md px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Cari Member
              </button>
            </div>
          </form>
          <div className="animate-bounce mt-3">
            <a href="#package" className={`text-white ${isShowPackage ? "hidden" : ""} `} onClick={() => setIsShowPackage(true)}>
              Tampilkan paket
            </a>
          </div>
        </div>

        {isShowPackage && (
          <div class="px-4 mx-auto max-w-screen-xl text-center py-12 lg:pb-28 lg:pt-16" id="package">
            <h2 class="mb-8 text-3xl font-extrabold tracking-tight leading-none text-white md:text-4xl lg:text-5xl">Paket Keanggotaan</h2>
            <div class="flex w-full justify-center items-center">
              <div className="w-full flex flex-nowrap overflow-x-auto gap-4">
                {items &&
                  items.map((item) => {
                    return <Card item={item} />;
                  })}
              </div>
            </div>
          </div>
        )}
      </section>
      <footer class="bg-gray-900 text-white py-8 w-full">
        <div class="w-full flex flex-row items-center justify-center px-4">
          <div class="flex flex-col md:flex-row justify-between mt-10 w-full md:basis-3/4">
            <div class="mb-4 md:mb-0 flex flex-col basis-1/3 gap-y-3">
              <p class="text-lg font-extrabold">Tentang kami</p>
              <p className="text-wrap">Ruko dasana xentre blok BD no 20-22, Bojong Nangka, Kelapa Dua, Tangerang Regency, Banten 15810</p>
              <a className="text-wrap" href="https://wa.me/6281314206253">
                Contact : <span className="font-semibold italic hover:underline">Click Here (WA)</span>
              </a>
            </div>
            <div class="mb-4 md:mb-0 flex flex-col md:items-center basis-1/3 ">
              <div className="flex flex-col gap-y-3">
                <p class="text-lg font-extrabold">Halaman</p>
                <a href="/" className="hover:underline">
                  Homepage
                </a>
                <a href="#findmember" className="hover:underline">
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
    </>
  );
};

const Card = ({ item }) => {
  return (
    <div class="min-w-64 rounded-lg shadow-lg bg-gray-800 text-white p-6 mx-auto max-w-lg text-center  dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
      <h3 class="mb-4 text-2xl font-semibold">{item?.name}</h3>
      <div class="flex justify-center items-baseline my-8">
        <span class="mr-2 text-3xl font-extrabold text-nowrap">{formatRupiah(item?.price)}</span>
      </div>
      <ul role="list" class="mb-8 space-y-4 text-left">
        <li class="flex items-center space-x-3">
          <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
          </svg>
          <span>Membership selama {item?.days_add} hari</span>
        </li>
        <li class="flex items-center space-x-3">
          <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
          </svg>
          <span>Full akses 24/7</span>
        </li>
        <li class="flex items-center space-x-3">
          <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
          </svg>
          <span>Gratis akses setiap alat gym</span>
        </li>
      </ul>
    </div>
  );
};
