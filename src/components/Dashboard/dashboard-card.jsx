import { useEffect } from "react";
import { fetchActiveMember, fetchTotalMember, fetchTotalTransactions, fetchTransactions } from "../../functions/API/fetchDashboard";
import { useState } from "react";
import { Spinner } from "flowbite-react";

export const MemberCard = () => {
  const [totalMember, setTotalMember] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");
  useEffect(() => {
    setIsLoading(true);
    const fetch = async () => {
      try {
        const response = await fetchTotalMember(token);
        setTotalMember(response.data.data.members);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  return (
    <div class=" w-full max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-row items-center justify-start w-full space-x-4 p-4">
        <svg width="79" height="79" viewBox="0 0 79 79" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_1_37)">
            <g filter="url(#filter1_d_1_37)">
              <path
                d="M14.8125 69.125C14.8125 69.125 9.875 69.125 9.875 64.1875C9.875 59.25 14.8125 44.4375 39.5 44.4375C64.1875 44.4375 69.125 59.25 69.125 64.1875C69.125 69.125 64.1875 69.125 64.1875 69.125H14.8125ZM39.5 39.5C43.4285 39.5 47.1961 37.9394 49.974 35.1615C52.7519 32.3836 54.3125 28.616 54.3125 24.6875C54.3125 20.759 52.7519 16.9914 49.974 14.2135C47.1961 11.4356 43.4285 9.875 39.5 9.875C35.5715 9.875 31.8039 11.4356 29.026 14.2135C26.2481 16.9914 24.6875 20.759 24.6875 24.6875C24.6875 28.616 26.2481 32.3836 29.026 35.1615C31.8039 37.9394 35.5715 39.5 39.5 39.5Z"
                fill="#0056A3"
                fill-opacity="0.62"
                shape-rendering="crispEdges"
              />
            </g>
          </g>
          <defs>
            <filter id="filter0_d_1_37" x="-4" y="0" width="87" height="87" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_37" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_37" result="shape" />
            </filter>
            <filter id="filter1_d_1_37" x="3.875" y="4.875" width="71.25" height="71.25" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="1" />
              <feGaussianBlur stdDeviation="3" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.337255 0 0 0 0 0.639216 0 0 0 0.29 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_37" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_37" result="shape" />
            </filter>
          </defs>
        </svg>
        {isLoading ? (
          <Spinner size={"xl"} />
        ) : (
          <>
            <div className="flex flex-col justify-center space-y-4 items-start">
              <h1 className="font-semibold text-2xl">Member</h1>
              <h1 className="font-bold text-3xl">{totalMember || 0}</h1>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export const ActiveCard = () => {
  const [totalMember, setTotalMember] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");
  useEffect(() => {
    setIsLoading(true);
    const fetch = async () => {
      try {
        const response = await fetchActiveMember(token);
        setTotalMember(response.data.data.members);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);
  return (
    <div class=" w-full max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-row items-center justify-start w-full space-x-4 p-4">
        <svg width="80" height="60" viewBox="0 0 52 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M26 11C24.1435 11 22.363 11.7375 21.0503 13.0503C19.7375 14.363 19 16.1435 19 18C19 19.8565 19.7375 21.637 21.0503 22.9497C22.363 24.2625 24.1435 25 26 25C27.8565 25 29.637 24.2625 30.9497 22.9497C32.2625 21.637 33 19.8565 33 18C33 16.1435 32.2625 14.363 30.9497 13.0503C29.637 11.7375 27.8565 11 26 11ZM26 29.6667C22.9058 29.6667 19.9383 28.4375 17.7504 26.2496C15.5625 24.0617 14.3333 21.0942 14.3333 18C14.3333 14.9058 15.5625 11.9383 17.7504 9.75042C19.9383 7.5625 22.9058 6.33333 26 6.33333C29.0942 6.33333 32.0617 7.5625 34.2496 9.75042C36.4375 11.9383 37.6667 14.9058 37.6667 18C37.6667 21.0942 36.4375 24.0617 34.2496 26.2496C32.0617 28.4375 29.0942 29.6667 26 29.6667ZM26 0.5C14.3333 0.5 4.37 7.75667 0.333336 18C4.37 28.2433 14.3333 35.5 26 35.5C37.6667 35.5 47.63 28.2433 51.6667 18C47.63 7.75667 37.6667 0.5 26 0.5Z"
            fill="#0056A3"
            fill-opacity="0.62"
          />
        </svg>
        {isLoading ? (
          <Spinner size={"xl"} />
        ) : (
          <>
            <div className="flex flex-col justify-center space-y-4 items-start">
              <h1 className="font-semibold text-2xl text-nowrap">Member Aktif</h1>
              <h1 className="font-bold text-3xl">{totalMember || 0}</h1>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export const TransactionCard = () => {
  const [transactions, setTransactions] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");
  useEffect(() => {
    setIsLoading(true);
    const fetch = async () => {
      try {
        const response = await fetchTransactions(token);
        setTransactions(response.data.data.transactions);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);
  return (
    <div class=" w-full max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-row items-center justify-start w-full space-x-4 p-4">
        <svg width="61" height="61" viewBox="0 0 61 61" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5.08333 17.7917H50.8333M40.6667 5.08333L53.375 17.7917L40.6667 30.5M55.9167 43.2083H10.1667M20.3333 30.5L7.62499 43.2083L20.3333 55.9167"
            stroke="#0056A3"
            stroke-opacity="0.62"
            stroke-width="5.67"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        {isLoading ? (
          <Spinner size={"xl"} />
        ) : (
          <>
            <div className="flex flex-col justify-center space-y-4 items-start">
              <h1 className="font-semibold text-2xl">Pembayaran</h1>
              <h1 className="font-bold text-3xl">{transactions || 0}</h1>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export const PembayaranCard = () => {
  const [transactions, setTransactions] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");
  useEffect(() => {
    setIsLoading(true);
    const fetch = async () => {
      try {
        const response = await fetchTotalTransactions(token);
        setTransactions(response?.data?.data?.transactions?._sum?.total_payments);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);
  return (
    <div class="w-full max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-row items-center justify-start w-full space-x-4 p-4">
        <svg width="70" height="70" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M40 40C40 37.2375 32.165 35 22.5 35M40 40C40 42.7625 32.165 45 22.5 45C12.835 45 5 42.7625 5 40M40 40V52.3425C40 55.19 32.165 57.5 22.5 57.5C12.835 57.5 5 55.1925 5 52.3425V40M40 40C49.56 40 57.5 37.5325 57.5 35V10M22.5 35C12.835 35 5 37.2375 5 40M22.5 35C11.455 35 2.5 32.5325 2.5 30V17.5M22.5 12.5C11.455 12.5 2.5 14.7375 2.5 17.5M2.5 17.5C2.5 20.2625 11.455 22.5 22.5 22.5C22.5 25.0325 30.6325 27.5 40.1925 27.5C49.75 27.5 57.5 25.0325 57.5 22.5M57.5 10C57.5 7.2375 49.75 5 40.1925 5C30.6325 5 22.885 7.2375 22.885 10M57.5 10C57.5 12.7625 49.75 15 40.1925 15C30.635 15 22.885 12.7625 22.885 10M22.885 10V35.415"
            stroke="#0056A3"
            stroke-opacity="0.62"
            stroke-width="3.67"
          />
        </svg>
        {isLoading ? (
          <Spinner size={"xl"} />
        ) : (
          <>
            <div className="flex flex-col justify-center space-y-4 items-start">
              <h1 className="font-semibold text-2xl">Pendapatan</h1>
              <h1 className="font-bold text-3xl">{transactions ? `${transactions / 1000000} Jt` : 0}</h1>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
