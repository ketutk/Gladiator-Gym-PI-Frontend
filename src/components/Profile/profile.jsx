import { useState } from "react";
import AlertError from "../reusable/error";
import { useEffect } from "react";
import { fetchUpdateProfile } from "../../functions/API/fetchUser";
import AlertSuccess from "../reusable/success";

const Profile = ({ user, setShouldRefetch, token }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setAddress(user?.profile?.address);
    setPhone(user?.profile?.phone);
    setName(user?.name);
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetchUpdateProfile({ phone, name, address }, token);
      console.log(response);
      setShouldRefetch(true);
      setSuccess(response.data.message);
      setIsLoading(false);
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.data?.message);
      setIsLoading(false);
    }
  };
  return (
    <>
      <h1 className="text-4xl font-bold text-center">Profil</h1>

      <div class="flex flex-col justify-center w-full p-8">
        <div class="max-w-xl w-full mx-auto bg-white p-8 border border-gray-300 shadow-md rounded-lg ">
          {user && (
            <form onSubmit={handleSubmit}>
              {error && <AlertError error={error} font={`font-bold`} layer={`text-center py-3`} />}
              {success && <AlertSuccess success={success} font={`font-bold`} layer={`text-center py-3`} />}
              <div class="mb-4">
                <label class="block text-gray-700 mb-2" for="email">
                  Email
                </label>
                <input type="email" id="email" name="email" placeholder="Contoh: johndoe@gmail.com" class="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600" disabled value={user.email} />
              </div>
              <div class="mb-6">
                <label class="block text-gray-700 mb-2" for="name">
                  Nama
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Masukkan nama"
                  class="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div class="mb-6">
                <label class="block text-gray-700 mb-2" for="phone">
                  Telepon
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="Masukkan nomor telepon"
                  class="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                  required
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value), setError("");
                  }}
                />
              </div>
              <div class="mb-6">
                <label class="block text-gray-700 mb-2" for="ktp">
                  Nomor KTP
                </label>
                <input
                  type="text"
                  id="ktp"
                  name="ktp"
                  placeholder="Masukkan nomor telepon"
                  class="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                  required
                  disabled
                  value={user?.profile?.ktp_id}
                />
              </div>
              <div class="mb-6">
                <label class="block text-gray-700 mb-2" for="address">
                  Tempat Tinggal
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Masukkan nomor telepon"
                  class="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                  required
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value), setError("");
                  }}
                />
              </div>
              <button type="submit" class="w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600" disabled={isLoading}>
                {name ? (isLoading ? "Mohon tunggu..." : "Perbarui") : "Memuat data..."}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
