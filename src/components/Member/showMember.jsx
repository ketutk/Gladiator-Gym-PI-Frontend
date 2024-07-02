import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import AlertError from "../reusable/error";
import AlertSuccess from "../reusable/success";
import { fetchAddMember, fetchUpdateMember } from "../../functions/API/fetchMember";
import { useEffect } from "react";
export const ShowMember = ({ item, setItem, setShouldRefetch }) => {
  const [show, setShow] = useState(true);
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [isChanged, setIsChanged] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");

  const handleUpdate = async () => {
    setIsLoading(true);
    if (!name && !phone && !address) {
      setError("Nama dan alamat perlu diisi!");
      setIsLoading(false);

      return;
    }

    const data = {
      name: name ? name : item.name,
      phone: phone ? phone : item.phone,
      address: address ? address : item.address,
    };
    console.log(data);
    try {
      const response = await fetchUpdateMember(item.id, data, token);
      setSuccess(response.data.message);
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleClose = () => {
    setItem();
    setError("");
    setSuccess("");
    setName("");
    setPhone("");
    setAddress("");
    if (isChanged) {
      setShouldRefetch(true);
    }
  };
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
      <Modal dismissible show={show} onClose={handleClose}>
        <Modal.Header>Detail Member</Modal.Header>
        <Modal.Body>
          {success && <AlertSuccess success={success} font={"text-lg font-semibold"} layer={"text-center py-3"} />}
          {error && <AlertError error={error} font={"text-lg font-semibold"} layer={"text-center py-3"} />}
          <div>
            <div class="mb-4">
              <label class="block text-gray-700 mb-2" for="name">
                Nama
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Contoh: Ketut Krisna"
                class="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                value={typeof name !== "undefined" ? name : item.name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError("");
                  setIsChanged(true);
                }}
              />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 mb-2" for="email">
                Email
              </label>
              <input type="email" id="email" name="email" placeholder="Contoh: johndoe@gmail.com" class="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600" value={item.email} disabled />
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
                value={typeof phone !== "undefined" ? phone : item.phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setError("");

                  setIsChanged(true);
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
                value={typeof address !== "undefined" ? address : item.address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  setError("");

                  setIsChanged(true);
                }}
              />
            </div>
            <div class="mb-6">
              <h3 className="text-lg font-semibold">Membership</h3>
            </div>
            <div class="mb-6">
              <label class="block text-gray-700 mb-2" for="status">
                Status
              </label>
              <input
                type="text"
                id="status"
                name="status"
                placeholder="Masukkan alamat"
                class="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                required
                value={item?.membership?.status === true ? "AKTIF" : "NON-AKTIF"}
                disabled
              />
            </div>
            <div class="mb-6">
              <label class="block text-gray-700 mb-2" for="date">
                Masa Berlaku
              </label>
              <input
                type="text"
                id="date"
                name="date"
                class="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                required
                value={item?.membership?.active_until ? new Date(item?.membership?.active_until).toLocaleString() : "NULL"}
                disabled
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="dark" disabled={isChanged == true ? false : true || isLoading === true ? true : false} onClick={handleUpdate}>
            {isLoading ? "Mohon tunggu..." : "Perbarui"}
          </Button>
          <Button color="dark" onClick={handleClose}>
            Keluar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
