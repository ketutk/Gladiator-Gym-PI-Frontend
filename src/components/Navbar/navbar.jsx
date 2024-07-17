import { useEffect, useState } from "react";
import { fetchWhoami } from "../../functions/API/fetchUser";
import { useLocation } from "react-router-dom";
import { getPath } from "../../functions/libs/getPath";

const Navbar = ({ childComponent: ChildComponent }) => {
  const [user, setUser] = useState({});
  const [shouldRefetch, setShouldRefetch] = useState(true);
  const [location, setLocation] = useState(getPath());
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchWhoami(token);
        console.log(response.data.data.user);
        setUser(response.data.data.user);
        setShouldRefetch(false);
      } catch (error) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    };
    if (shouldRefetch) {
      fetchData();
    }
  }, [shouldRefetch]);
  return (
    <>
      <div className="sm:hidden flex flex-row justify-between items-center w-full shadow-xl shadow-gray-500">
        <button
          data-drawer-target="logo-sidebar"
          data-drawer-toggle="logo-sidebar"
          aria-controls="logo-sidebar"
          type="button"
          class="inline-flex items-center p-2 my-2 ms-3 text-sm rounded-lg  bg-gray-800  focus:outline-none focus:ring-2  text-gray-400 hover:bg-gray-700 focus:ring-gray-600 border border-gray-800"
        >
          <span class="sr-only">Open sidebar</span>
          <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
              clip-rule="evenodd"
              fill-rule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>

        <svg class="w-8 h-8 mr-3" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="#000000">
          <g id="SVGRepo_bgCarrier" stroke-width="0" />

          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

          <g id="SVGRepo_iconCarrier">
            <path
              fill="#000000"
              d="M165.906 18.688C15.593 59.28-42.187 198.55 92.72 245.375h-1.095c.635.086 1.274.186 1.906.28 8.985 3.077 18.83 5.733 29.532 7.94C173.36 273.35 209.74 321.22 212.69 368c-33.514 23.096-59.47 62.844-59.47 62.844L179.5 469.53 138.28 493h81.97c-40.425-40.435-11.76-85.906 36.125-85.906 48.54 0 73.945 48.112 36.156 85.906h81.126l-40.375-23.47 26.283-38.686s-26.376-40.4-60.282-63.406c3.204-46.602 39.5-94.167 89.595-113.844 10.706-2.207 20.546-4.86 29.53-7.938.633-.095 1.273-.195 1.908-.28h-1.125c134.927-46.82 77.163-186.094-73.157-226.69-40.722 39.37 6.54 101.683 43.626 56.877 36.9 69.08 8.603 127.587-72.28 83.406-11.88 24.492-34.213 41.374-60.688 41.374-26.703 0-49.168-17.167-60.97-42-81.774 45.38-110.512-13.372-73.437-82.78 37.09 44.805 84.35-17.508 43.626-56.876zm90.79 35.92c-27.388 0-51.33 27.556-51.33 63.61 0 36.056 23.942 62.995 51.33 62.995 27.387 0 51.327-26.94 51.327-62.994 0-36.058-23.94-63.61-51.328-63.61z"
            />
          </g>
        </svg>
      </div>

      <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 " aria-label="Sidebar">
        <div class="h-full px-3 py-4 overflow-y-auto bg-gradient-to-r from-gray-800 to-gray-900">
          <a href="/dashboard" class="flex items-center ps-2.5 mb-5">
            <img src="/muscle.svg" class="h-6 me-3 sm:h-7" alt="Flowbite Logo" />
            <span class="self-center text-xl font-semibold whitespace-nowrap text-white">Gladiator Gym</span>
          </a>
          <ul class="space-y-2 font-medium">
            <li>
              <a href="/dashboard" class={`flex items-center p-2  rounded-lg text-white ${location == "dashboard" ? "bg-gray-700" : ""} hover:bg-gray-700 group`}>
                <svg class="w-5 h-5  transition duration-75 text-gray-400  group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span class="ms-3">Dashbor</span>
              </a>
            </li>
            {user && user.role === "SUPERADMIN" && (
              <>
                <li>
                  <a href="/admin" class={`flex items-center p-2  rounded-lg text-white ${location == "admin" ? "bg-gray-700" : ""} hover:bg-gray-700 group`}>
                    <svg class="flex-shrink-0 w-5 h-5  transition duration-75 text-gray-400  group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                      <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                    </svg>
                    <span class="flex-1 ms-3 whitespace-nowrap">Admin</span>
                    <span class="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium  rounded-full bg-gray-700 text-gray-300">Superadmin</span>
                  </a>
                </li>
                {/* <li>
                  <a href="/paket" class={`flex items-center p-2  rounded-lg text-white ${location == "paket" ? "bg-gray-700" : ""} hover:bg-gray-700 group`}>
                    
                    <svg class="flex-shrink-0 w-5 h-5  transition duration-75 text-gray-400  group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd" d="M6 2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 1 0 0-2h-2v-2h2a1 1 0 0 0 1-1V4a2 2 0 0 0-2-2h-8v16h5v2H7a1 1 0 1 1 0-2h1V2H6Z" clip-rule="evenodd" />
                    </svg>

                    <span class="flex-1 ms-3 whitespace-nowrap">Paket</span>
                    <span class="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium  rounded-full bg-gray-700 text-gray-300">Superadmin</span>
                  </a>
                </li> */}
              </>
            )}
            <li>
              <a href="/member" class={`flex items-center p-2  rounded-lg text-white ${location == "member" ? "bg-gray-700" : ""} hover:bg-gray-700 group`}>
                <svg class="flex-shrink-0 w-5 h-5  transition duration-75 text-gray-400  group-hover:text-white" aria-hidden="true" viewBox="4 3 19 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    d="M7 2a2 2 0 0 0-2 2v1a1 1 0 0 0 0 2v1a1 1 0 0 0 0 2v1a1 1 0 1 0 0 2v1a1 1 0 1 0 0 2v1a1 1 0 1 0 0 2v1a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H7Zm3 8a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm-1 7a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3 1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1Z"
                    clip-rule="evenodd"
                  />
                </svg>

                <span class="flex-1 ms-3 whitespace-nowrap">Member</span>
              </a>
            </li>
            <li>
              <a href="/pembayaran" class={`flex items-center p-2  rounded-lg text-white ${location == "pembayaran" ? "bg-gray-700" : ""} hover:bg-gray-700 group`}>
                <svg class="flex-shrink-0 w-5 h-5  transition duration-75 text-gray-400  group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="2 0 20 20">
                  <path fill-rule="evenodd" d="M12 14a3 3 0 0 1 3-3h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4a3 3 0 0 1-3-3Zm3-1a1 1 0 1 0 0 2h4v-2h-4Z" clip-rule="evenodd" />
                  <path
                    fill-rule="evenodd"
                    d="M12.293 3.293a1 1 0 0 1 1.414 0L16.414 6h-2.828l-1.293-1.293a1 1 0 0 1 0-1.414ZM12.414 6 9.707 3.293a1 1 0 0 0-1.414 0L5.586 6h6.828ZM4.586 7l-.056.055A2 2 0 0 0 3 9v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2h-4a5 5 0 0 1 0-10h4a2 2 0 0 0-1.53-1.945L17.414 7H4.586Z"
                    clip-rule="evenodd"
                  />
                </svg>

                <span class="flex-1 ms-3 whitespace-nowrap">Pembayaran</span>
              </a>
            </li>

            <li>
              <a href="/profile" class={`flex items-center p-2  rounded-lg text-white ${location == "profile" ? "bg-gray-700" : ""} hover:bg-gray-700 group`}>
                <svg class="flex-shrink-0 w-5 h-5  transition duration-75 text-gray-400  group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                </svg>
                <span class="flex-1 ms-3 whitespace-nowrap">Profil</span>
              </a>
            </li>
            <li>
              <a href="/password" class={`flex items-center p-2  rounded-lg text-white ${location == "password" ? "bg-gray-700" : ""} hover:bg-gray-700 group`}>
                <svg class="flex-shrink-0 w-5 h-5  transition duration-75 text-gray-400  group-hover:text-white" aria-hidden="true" viewBox="4 3 19 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path d="M13 14C13 13.4477 12.5523 13 12 13C11.4477 13 11 13.4477 11 14V16C11 16.5523 11.4477 17 12 17C12.5523 17 13 16.5523 13 16V14Z"></path>{" "}
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7 8.12037C5.3161 8.53217 4 9.95979 4 11.7692V17.3077C4 19.973 6.31545 22 9 22H15C17.6846 22 20 19.973 20 17.3077V11.7692C20 9.95979 18.6839 8.53217 17 8.12037V7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7V8.12037ZM15 7V8H9V7C9 6.64936 9.06015 6.31278 9.17071 6C9.58254 4.83481 10.6938 4 12 4C13.3062 4 14.4175 4.83481 14.8293 6C14.9398 6.31278 15 6.64936 15 7ZM6 11.7692C6 10.866 6.81856 10 8 10H16C17.1814 10 18 10.866 18 11.7692V17.3077C18 18.7208 16.7337 20 15 20H9C7.26627 20 6 18.7208 6 17.3077V11.7692Z"
                    ></path>{" "}
                  </g>
                </svg>
                <span class="flex-1 ms-3 whitespace-nowrap">Ganti Password</span>
              </a>
            </li>
            <li>
              <a
                class="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  localStorage.removeItem("token");
                  window.location.href = "/login";
                }}
              >
                <svg class="flex-shrink-0 w-5 h-5  transition duration-75 text-gray-400 group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
                </svg>
                <span class="flex-1 ms-3 whitespace-nowrap">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      <div class="p-4 sm:ml-64 bg-gray-100 min-h-screen">
        <div class=" rounded-lg dark:border-gray-700">
          <ChildComponent user={user} setShouldRefetch={setShouldRefetch} token={token} />
        </div>
      </div>
    </>
  );
};

export default Navbar;
