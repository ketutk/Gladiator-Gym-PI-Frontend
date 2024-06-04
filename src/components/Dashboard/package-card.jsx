import { useEffect } from "react";
import { fetchTransactionsByPackage } from "../../functions/API/fetchDashboard";
import { useState } from "react";
import { Spinner } from "flowbite-react";

export const PackageCard = () => {
  const [items, setItems] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");
  useEffect(() => {
    setIsLoading(true);
    const fetch = async () => {
      try {
        const response = await fetchTransactionsByPackage(token);
        console.log(response.data.data.transactions);
        setItems(response.data.data.transactions);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);
  return (
    <>
      {isLoading ? (
        <Spinner size={"xl"} />
      ) : (
        items?.map((item) => {
          return (
            <div class="w-full max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <h1 className="font-bold text-2xl">{item?.name}</h1>
              <div className="flex flex-row items-center justify-around w-full space-x-10 p-4 min-h-40 ">
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-row space-x-3">
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_1_118)">
                        <path
                          d="M2.73785 9.31585H24.5242M19.6828 3.27085L25.7345 9.31585L19.6828 15.3609M26.9449 21.4059H5.15856M9.99997 15.3609L3.94821 21.4059L9.99997 27.4509"
                          stroke="#0056A3"
                          stroke-opacity="0.62"
                          stroke-width="3.67"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1_118">
                          <rect width="29.0485" height="29.016" fill="white" transform="translate(0.317139 0.852854)" />
                        </clipPath>
                      </defs>
                    </svg>
                    <h1 className="text-xl font-semibold">{item?._count?.payments || 0}</h1>
                  </div>
                  <h1 className="text-xl font-semibold">Transaksi</h1>
                </div>
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-row space-x-3">
                    <svg width="35" height="36" viewBox="0 0 35 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M23.1782 22.4806C23.1782 21.18 19.4999 20.1266 14.9625 20.1266M23.1782 22.4806C23.1782 23.7812 19.4999 24.8346 14.9625 24.8346C10.4251 24.8346 6.7468 23.7812 6.7468 22.4806M23.1782 22.4806V28.2915C23.1782 29.6321 19.4999 30.7197 14.9625 30.7197C10.4251 30.7197 6.7468 29.6333 6.7468 28.2915V22.4806M23.1782 22.4806C27.6664 22.4806 31.394 21.3189 31.394 20.1266V8.3564M14.9625 20.1266C10.4251 20.1266 6.7468 21.18 6.7468 22.4806M14.9625 20.1266C9.77722 20.1266 5.57312 18.9648 5.57312 17.7725V11.8874M14.9625 9.53342C9.77722 9.53342 5.57312 10.5868 5.57312 11.8874M5.57312 11.8874C5.57312 13.1881 9.77722 14.2415 14.9625 14.2415C14.9625 15.4338 18.7805 16.5955 23.2686 16.5955C27.7556 16.5955 31.394 15.4338 31.394 14.2415M31.394 8.3564C31.394 7.0558 27.7556 6.00237 23.2686 6.00237C18.7805 6.00237 15.1433 7.0558 15.1433 8.3564M31.394 8.3564C31.394 9.657 27.7556 10.7104 23.2686 10.7104C18.7817 10.7104 15.1433 9.657 15.1433 8.3564M15.1433 8.3564V20.3219"
                        stroke="#0056A3"
                        stroke-opacity="0.62"
                        stroke-width="1.67"
                      />
                    </svg>

                    <h1 className="text-xl font-semibold">{item?.total_payments ? `${item?.total_payments / 1000000} Jt` : 0}</h1>
                  </div>
                  <h1 className="text-xl font-semibold">Pembayaran</h1>
                </div>
              </div>
            </div>
          );
        })
      )}
    </>
  );
};
