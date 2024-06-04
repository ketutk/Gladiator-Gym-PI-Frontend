import { Button, Modal } from "flowbite-react";
import { useState, useEffect } from "react";
import AlertError from "../reusable/error";
import AlertSuccess from "../reusable/success";
import Select from "react-select";
import { fetchAddMember, fetchAllMember } from "../../functions/API/fetchMember";
import { fetchPackage } from "../../functions/API/fetchPackage";
import { fetchAddPayment } from "../../functions/API/fetchPayment";
export const CreatePayment = ({ setCurrentPage, setShouldRefetch, setDebounceName, setFrom, setTo }) => {
  const [openModal, setOpenModal] = useState(false);
  const [members, setMembers] = useState();
  const [packages, setPackages] = useState();
  const [selectedMembers, setSelectedMembers] = useState();
  const [selectedPackages, setSelectedPackages] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const membersData = await fetchAllMember(token);
        const packagesData = await fetchPackage(token);
        // console.log(membersData.data.data.members);
        // console.log(packagesData.data.data.packages);
        setMembers(membersData.data.data.members.map((member) => ({ value: member.id, label: `${member.name}  (${member?.email ? member?.email : member?.phone})` })));
        setPackages(packagesData.data.data.packages.map((pkg) => ({ value: pkg.id, label: pkg.name })));
      } catch (error) {
        setError(error.response.data.message);
      }
    };

    fetchAll();
  }, []);

  const handleSubmit = async () => {
    console.log(selectedMembers);
    console.log(selectedPackages);
    setIsLoading(true);
    if (!selectedMembers || !selectedPackages) {
      setError("Mohon pilih member dan paket");
      return setIsLoading(false);
    }

    try {
      const response = await fetchAddPayment({ member_id: selectedMembers.value, package_id: selectedPackages.value }, token);

      setSuccess(response.data.message);
      setSelectedMembers();
      setSelectedPackages();
      setCurrentPage(1);
      setDebounceName("");
      setFrom("");
      setTo("");
      setShouldRefetch(true);
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
          setError("");
          setSuccess("");
          setOpenModal(true);
        }}
        color={"dark"}
        className="flex items-center justify-center text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm  dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
      >
        Tambah Pembayaran
      </Button>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Tambah Pembayaran</Modal.Header>
        <Modal.Body className={` overflow-auto`}>
          {success && <AlertSuccess success={success} font={"text-lg font-semibold"} layer={"text-center py-3"} />}
          {error && <AlertError error={error} font={"text-lg font-semibold"} layer={"text-center py-3"} />}
          <form>
            <div class={`mb-4 `}>
              <label class="block text-gray-700 mb-2" for="name">
                Member
              </label>
              {members && (
                <Select
                  options={members}
                  placeholder="Pilih member"
                  value={selectedMembers}
                  onMenuOpen={() => setIsOpen(true)}
                  onMenuClose={() => setIsOpen(false)}
                  onChange={(selectedOption) => {
                    setSelectedMembers(selectedOption);
                    setError("");
                  }}
                />
              )}
            </div>
            <div class={`mb-4 ${isOpen ? "min-h-screen" : ""}`}>
              <label class="block text-gray-700 mb-2" for="name">
                Paket
              </label>
              {packages && (
                <Select
                  options={packages}
                  placeholder="Pilih paket"
                  className="react-select-container"
                  classNamePrefix="react-select"
                  onMenuOpen={() => setIsOpen(true)}
                  onMenuClose={() => setIsOpen(false)}
                  onChange={(selectedOption) => {
                    setSelectedPackages(selectedOption);
                    setError("");
                  }}
                />
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit} color={"dark"} disabled={isLoading ? true : false}>
            Tambah
          </Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Batal
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
