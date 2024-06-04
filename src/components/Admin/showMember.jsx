import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import AlertError from "../reusable/error";
import AlertSuccess from "../reusable/success";
import { fetchAddMember } from "../../functions/API/fetchMember";
export const ShowMember = ({ item, setItem }) => {
  const [show, setShow] = useState(true);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");
  return (
    <>
      {/* <a
        onClick={() => {
          console.log("klik");
          setShow(true);
        }}
        color={"dark"}
        className="flex items-center justify-center focus:ring-4 focus:ring-gray-300  text-sm"
      >
        Lihat
      </a> */}
      <Modal dismissible show={show} onClose={() => setItem()}>
        <Modal.Header>Detail Admin</Modal.Header>
        <Modal.Body>
          {success && <AlertSuccess success={success} font={"text-lg font-semibold"} layer={"text-center py-3"} />}
          {error && <AlertError error={error} font={"text-lg font-semibold"} layer={"text-center py-3"} />}
          <div>
            <div class="mb-4">
              <label class="block text-gray-700 mb-2" for="name">
                Name
              </label>
              <input type="text" id="name" name="name" placeholder="Contoh: Ketut Krisna" class="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600" value={item.name} disabled />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 mb-2" for="email">
                Email
              </label>
              <input type="email" id="email" name="email" placeholder="Contoh: johndoe@gmail.com" class="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600" value={item.email} disabled />
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
                value={item?.profile?.phone}
                disabled
              />
            </div>
            <div class="mb-6">
              <label class="block text-gray-700 mb-2" for="ktp">
                KTP_ID
              </label>
              <input type="text" id="ktp" name="ktp" placeholder="Masukkan nomor telepon" class="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600" value={item?.profile?.ktp_id} disabled />
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
                value={item?.profile?.address}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="dark" onClick={() => setItem()}>
            Keluar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
