import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import AlertError from "../reusable/error";
import AlertSuccess from "../reusable/success";
import { fetchAddMember } from "../../functions/API/fetchMember";
import { fetchAddAdmin } from "../../functions/API/fetchUser";
export const CreateAdmin = ({ setCurrentPage, setShouldRefetch, setDebounceName }) => {
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ktp, setKtp] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");

  const handleSubmit = async () => {
    setIsLoading(true);
    if (!name || !email || !address || !phone || !ktp) {
      setError("Semua field harus diisi!");
      return setIsLoading(false);
    }

    try {
      const response = await fetchAddAdmin({ name, phone, email, address, ktp_id: ktp }, token);

      setSuccess(response.data.message);
      setName("");
      setEmail("");
      setKtp("");
      setPhone("");
      setAddress("");
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => {
          setName("");
          setEmail("");
          setPhone("");
          setAddress("");
          setError("");
          setSuccess("");
          setOpenModal(true);
        }}
        color={"dark"}
        className="flex items-center justify-center text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm  dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
      >
        Tambah Admin
      </Button>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Tambah Admin</Modal.Header>
        <Modal.Body>
          {success && <AlertSuccess success={success} font={"text-lg font-semibold"} layer={"text-center py-3"} />}
          {error && <AlertError error={error} font={"text-lg font-semibold"} layer={"text-center py-3"} />}
          <form>
            <div class="mb-4">
              <label class="block text-gray-700 mb-2" for="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Contoh: Ketut Krisna"
                class="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError("");
                  setSuccess("");
                }}
              />
            </div>
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
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                  setSuccess("");
                }}
              />
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 mb-2" for="ktp">
                KTP_ID
              </label>
              <input
                type="text"
                id="ktp"
                name="ktp"
                placeholder="Contoh: johndoe@gmail.com"
                class="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                value={ktp}
                required
                onChange={(e) => {
                  setKtp(e.target.value);
                  setError("");
                  setSuccess("");
                }}
              />
            </div>
            <div class="mb-6">
              <label class="block text-gray-700 mb-2" for="phone">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="Masukkan nomor telepon"
                class="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                value={phone}
                required
                onChange={(e) => {
                  setPhone(e.target.value);
                  setError("");
                  setSuccess("");
                }}
              />
            </div>
            <div class="mb-6">
              <label class="block text-gray-700 mb-2" for="address">
                Alamat
              </label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Masukkan alamat"
                class="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                required
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  setError("");
                  setSuccess("");
                }}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit} color={"dark"} disabled={isLoading ? true : false}>
            {isLoading ? "Tunggu.." : "Tambah"}
          </Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Batal
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
