import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import AlertError from "../reusable/error";
import AlertSuccess from "../reusable/success";
import { formatRupiah } from "../../functions/libs/formatRupiah";
export const ShowPayment = ({ item, setItem }) => {
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
        <Modal.Header>Detail Pembayaran</Modal.Header>
        <Modal.Body>
          {success && <AlertSuccess success={success} font={"text-lg font-semibold"} layer={"text-center py-3"} />}
          {error && <AlertError error={error} font={"text-lg font-semibold"} layer={"text-center py-3"} />}
          <div>
            <div class="mb-6">
              <h3 className="text-lg font-semibold">Pembayaran</h3>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 mb-2" for="name">
                Metode Pembayaran
              </label>
              <input type="text" id="name" name="name" placeholder="Contoh: Ketut Krisna" class="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600" value={item?.payment_method} disabled />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 mb-2" for="name">
                Total Pembayaran
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Contoh: Ketut Krisna"
                class="cursor-pointer w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                value={formatRupiah(item?.total_payments)}
              />
            </div>
            <div class="mb-6">
              <h3 className="text-lg font-semibold">Member</h3>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 mb-2" for="name">
                Name
              </label>
              <input type="text" id="name" name="name" placeholder="Contoh: Ketut Krisna" class="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600" value={item?.member?.name} disabled />
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
                value={item?.member?.email || "NULL"}
                disabled
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
                value={item?.member?.phone || "NULL"}
                disabled
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
                value={item?.member?.address}
              />
            </div>
            <div class="mb-6">
              <h3 className="text-lg font-semibold">Paket</h3>
            </div>
            <div class="mb-6">
              <label class="block text-gray-700 mb-2" for="address">
                Nama Paket
              </label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Masukkan alamat"
                class="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                required
                value={item?.package?.name}
                disabled
              />
            </div>
            <div class="mb-6">
              <label class="block text-gray-700 mb-2" for="address">
                Harga Paket
              </label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Masukkan alamat"
                class="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                required
                value={formatRupiah(item?.package?.price)}
                disabled
              />
            </div>
            <div class="mb-6">
              <h3 className="text-lg font-semibold">Staff</h3>
            </div>
            <div class="mb-6">
              <label class="block text-gray-700 mb-2" for="date">
                Nama
              </label>
              <input
                type="text"
                id="date"
                name="date"
                placeholder="Masukkan alamat"
                class="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                required
                value={item?.staff?.name || "NULL"}
                disabled
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
