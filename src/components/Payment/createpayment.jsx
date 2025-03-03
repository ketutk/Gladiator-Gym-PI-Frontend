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
  const [paymentMethod, setPaymentMethod] = useState();
  const [selectedMembers, setSelectedMembers] = useState();
  const [selectedPackages, setSelectedPackages] = useState();
  const [selectedMethod, setSelectedMethod] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const membersData = await fetchAllMember(token);
        const packagesData = await fetchPackage();
        setMembers(membersData.data.data.members.map((member) => ({ value: member.id, label: `${member.name}  (${member?.email ? member?.email : member?.phone})` })));
        setPackages(packagesData.data.data.packages.map((pkg) => ({ value: pkg.id, label: pkg.name })));
        setPaymentMethod([
          { value: "DEBIT", label: "DEBIT (BCA)" },
          { value: "CASH", label: "CASH" },
          { value: "TRANSFER", label: "TRANSFER (BCA)" },
        ]);
      } catch (error) {
        setError(error.response.data.message);
      }
    };

    fetchAll();
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    if (!selectedMembers || !selectedPackages) {
      setError("Mohon pilih member dan paket");
      return setIsLoading(false);
    }

    try {
      const response = await fetchAddPayment({ member_id: selectedMembers.value, package_id: selectedPackages.value, payment_method: selectedMethod.value }, token);
      console.log(response.data);
      setSuccess(response.data.message);
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
      <Modal
        dismissible
        show={openModal}
        onClose={() => {
          setSelectedMembers();
          setSelectedPackages();
          setSelectedMethod();
          setOpenModal(false);
        }}
      >
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
                    setSuccess;
                  }}
                />
              )}
            </div>
            <div class={`mb-4`}>
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
                    setSuccess("");
                  }}
                />
              )}
            </div>
            <div class={`mb-4 ${isOpen ? "min-h-screen" : ""}`}>
              <label class="block text-gray-700 mb-2" for="name">
                Metode Pembayaran
              </label>
              {paymentMethod && (
                <Select
                  options={paymentMethod}
                  placeholder="Pilih metode pembayaran"
                  className="react-select-container"
                  classNamePrefix="react-select"
                  onMenuOpen={() => setIsOpen(true)}
                  onMenuClose={() => setIsOpen(false)}
                  onChange={(selectedOption) => {
                    setSelectedMethod(selectedOption);
                    setError("");
                    setSuccess("");
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
          <Button
            color="gray"
            onClick={() => {
              setSelectedMembers();
              setSelectedPackages();
              setSelectedMethod();
              setOpenModal(false);
            }}
          >
            Batal
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
