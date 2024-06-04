import { useState } from "react";
import AlertError from "../reusable/error";
import { useEffect } from "react";
import { fetchChangePassword, fetchUpdateProfile } from "../../functions/API/fetchUser";
import AlertSuccess from "../reusable/success";

const Password = ({ user, setShouldRefetch, token }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (password !== confirmPassword) {
      setError("Kedua password tidak sama !");
      return;
    }

    try {
      const response = await fetchChangePassword({ password }, token);
      console.log(response);
      setShouldRefetch(true);
      setSuccess(response.data.message);
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <h1 className="text-4xl font-bold text-center">Ganti Password</h1>

      <div class="flex flex-col justify-center w-full p-8">
        <div class="max-w-xl w-full mx-auto bg-white p-8 border border-gray-300 shadow-md rounded-lg ">
          {user && (
            <form onSubmit={handleSubmit}>
              {error && <AlertError error={error} font={`font-bold`} layer={`text-center py-3`} />}
              {success && <AlertSuccess success={success} font={`font-bold`} layer={`text-center py-3`} />}
              <div class="mb-4">
                <label class="block text-gray-700 mb-2" for="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Masukkan password baru"
                  class="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  required
                />
              </div>
              <div class="mb-6">
                <label class="block text-gray-700 mb-2" for="confirm">
                  Konfirmasi Password
                </label>
                <input
                  type="password"
                  id="confirm"
                  name="confirm"
                  placeholder="Masukkan kembali password baru"
                  class="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setError("");
                  }}
                  required
                />
              </div>

              <button type="submit" class="w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600" disabled={isLoading ? true : false}>
                {isLoading ? "Mohon tunggu..." : "Perbarui"}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default Password;
