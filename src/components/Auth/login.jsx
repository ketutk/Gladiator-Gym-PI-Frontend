import { useState } from "react";
import AlertError from "../reusable/error";
import { fetchLogin } from "../../functions/API/fetchUser";
import { redirect } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Button } from "flowbite-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");
  if (token) {
    window.location.href = "/dashboard";
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!email || !password) {
      setError("Kedua kolom wajib diisi !");
    }

    try {
      const response = await fetchLogin(email, password);
      localStorage.setItem("token", response?.data?.data?.token);
      window.location.href = "/dashboard";
    } catch (error) {
      setError(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div class="flex min-h-screen md:h-screen">
      <div class="flex-col justify-center items-center w-1/2 bg-gradient-to-r from-gray-800 to-gray-900 text-white hidden md:flex">
        <svg class="w-20 h-20 fill-white" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" stroke-width="0" />
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
          <g id="SVGRepo_iconCarrier">
            <path d="M165.906 18.688C15.593 59.28-42.187 198.55 92.72 245.375h-1.095c.635.086 1.274.186 1.906.28 8.985 3.077 18.83 5.733 29.532 7.94C173.36 273.35 209.74 321.22 212.69 368c-33.514 23.096-59.47 62.844-59.47 62.844L179.5 469.53 138.28 493h81.97c-40.425-40.435-11.76-85.906 36.125-85.906 48.54 0 73.945 48.112 36.156 85.906h81.126l-40.375-23.47 26.283-38.686s-26.376-40.4-60.282-63.406c3.204-46.602 39.5-94.167 89.595-113.844 10.706-2.207 20.546-4.86 29.53-7.938.633-.095 1.273-.195 1.908-.28h-1.125c134.927-46.82 77.163-186.094-73.157-226.69-40.722 39.37 6.54 101.683 43.626 56.877 36.9 69.08 8.603 127.587-72.28 83.406-11.88 24.492-34.213 41.374-60.688 41.374-26.703 0-49.168-17.167-60.97-42-81.774 45.38-110.512-13.372-73.437-82.78 37.09 44.805 84.35-17.508 43.626-56.876zm90.79 35.92c-27.388 0-51.33 27.556-51.33 63.61 0 36.056 23.942 62.995 51.33 62.995 27.387 0 51.327-26.94 51.327-62.994 0-36.058-23.94-63.61-51.328-63.61z" />
          </g>
        </svg>
        <h1 class="text-4xl font-bold mb-4">Gladiator Gym</h1>
        <p class="text-lg">Your Ultimate Fitness Partner</p>
      </div>
      <div class="flex flex-col justify-center w-full md:w-1/2 p-8 bg-gradient-to-r from-gray-800 to-gray-900 md:from-white md:to-white">
        <div class="max-w-md w-full mx-auto bg-white p-8 border border-gray-300 shadow-md rounded-lg ">
          <div class="w-full flex flex-col items-center justify-center md:hidden">
            <svg class="w-14 h-14 fill-gray-800" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" stroke-width="0" />
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
              <g id="SVGRepo_iconCarrier">
                <path d="M165.906 18.688C15.593 59.28-42.187 198.55 92.72 245.375h-1.095c.635.086 1.274.186 1.906.28 8.985 3.077 18.83 5.733 29.532 7.94C173.36 273.35 209.74 321.22 212.69 368c-33.514 23.096-59.47 62.844-59.47 62.844L179.5 469.53 138.28 493h81.97c-40.425-40.435-11.76-85.906 36.125-85.906 48.54 0 73.945 48.112 36.156 85.906h81.126l-40.375-23.47 26.283-38.686s-26.376-40.4-60.282-63.406c3.204-46.602 39.5-94.167 89.595-113.844 10.706-2.207 20.546-4.86 29.53-7.938.633-.095 1.273-.195 1.908-.28h-1.125c134.927-46.82 77.163-186.094-73.157-226.69-40.722 39.37 6.54 101.683 43.626 56.877 36.9 69.08 8.603 127.587-72.28 83.406-11.88 24.492-34.213 41.374-60.688 41.374-26.703 0-49.168-17.167-60.97-42-81.774 45.38-110.512-13.372-73.437-82.78 37.09 44.805 84.35-17.508 43.626-56.876zm90.79 35.92c-27.388 0-51.33 27.556-51.33 63.61 0 36.056 23.942 62.995 51.33 62.995 27.387 0 51.327-26.94 51.327-62.994 0-36.058-23.94-63.61-51.328-63.61z" />
              </g>
            </svg>
            <h1 class="text-xl text-gray-800 font-bold mb-4">Gladiator Gym</h1>
          </div>
          <h2 class="text-2xl font-bold mb-6 text-gray-800">Login</h2>
          {error && <AlertError error={error} />}
          <form onSubmit={handleSubmit}>
            <div class="mb-4">
              <label class="block text-gray-700 mb-2" for="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Contoh: johndoe@gmail.com"
                class="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                required
                onChange={(e) => {
                  setError("");
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div class="mb-6">
              <label class="block text-gray-700 mb-2" for="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Masukkan password"
                class="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                required
                onChange={(e) => {
                  setError("");
                  setPassword(e.target.value);
                }}
              />
            </div>
            <button type="submit" class="w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600" disabled={isLoading ? true : false}>
              {isLoading ? "Mohon tunggu..." : "Masuk"}
            </button>
            <Button className="w-full bg-gray-900 hover:bg-gray-700 mt-3" color={"dark"} href="/">
              Kembali ke Home
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
