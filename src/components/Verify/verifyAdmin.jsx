import { useState } from "react";
import { getQueryParams } from "../../functions/libs/getQueryParams";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchRegisterAdmin } from "../../functions/API/fetchUser";

export const VerifyAdmin = () => {
  const [isSuccess, setIsSuccess] = useState();
  const [message, setMessage] = useState("");

  const { token } = useParams();
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await fetchRegisterAdmin(token);
        setIsSuccess(true);
        setMessage(response.data.message);
      } catch (error) {
        setIsSuccess(false);
        setMessage(error.response.data.message);
      }
    };
    fetch();
  }, []);
  return (
    <div className="w-full min-h-screen bg-gradient-to-bl from-gray-400 to-gray-100 flex justify-center items-center ">
      <div class="max-w-sm p-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-3 md:mx-0">
        <div className="w-full flex justify-center">
          {typeof isSuccess !== "undefined" ? (
            isSuccess === true ? (
              <svg class="w-40 h-40 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fill-rule="evenodd"
                  d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z"
                  clip-rule="evenodd"
                />
              </svg>
            ) : (
              <svg class="w-40 h-40 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m6 6 12 12m3-6a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            )
          ) : (
            <svg class="w-40 h-40 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path
                fill-rule="evenodd"
                d="M4 4a2 2 0 0 0-2 2v9a1 1 0 0 0 1 1h.535a3.5 3.5 0 1 0 6.93 0h3.07a3.5 3.5 0 1 0 6.93 0H21a1 1 0 0 0 1-1v-4a.999.999 0 0 0-.106-.447l-2-4A1 1 0 0 0 19 6h-5a2 2 0 0 0-2-2H4Zm14.192 11.59.016.02a1.5 1.5 0 1 1-.016-.021Zm-10 0 .016.02a1.5 1.5 0 1 1-.016-.021Zm5.806-5.572v-2.02h4.396l1 2.02h-5.396Z"
                clip-rule="evenodd"
              />
            </svg>
          )}
        </div>
        <div className="text-center">
          {typeof isSuccess !== "undefined" ? (
            isSuccess === true ? (
              <>
                <a href="#">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Proses verifikasi berhasil!</h5>
                </a>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{message}</p>
              </>
            ) : (
              <>
                <a href="#">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Proses verifikasi gagal.</h5>
                </a>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{message}</p>
              </>
            )
          ) : (
            <>
              <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Menunggu...</h5>
              </a>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Proses verifikasi sedang berjalan mohon tunggu sesaat....</p>
            </>
          )}
        </div>
        {isSuccess && (
          <div className="w-full flex items-center justify-center">
            <a href="/login" class="w-full px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300">
              Login
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
