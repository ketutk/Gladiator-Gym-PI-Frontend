import { Button, Datepicker, Modal } from "flowbite-react";
import { useState } from "react";

export function FilterTanggal({ setFrom, setTo, setShouldRefetch, from, to }) {
  const [openModal, setOpenModal] = useState(false);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const handleSet = () => {
    setShouldRefetch(true);
  };

  return (
    <>
      <Button onClick={() => setOpenModal(true)} color={"dark"}>
        Filter Tanggal
      </Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>FilterTanggal</Modal.Header>
        <Modal.Body className="min-h-72">
          <div className="flex flex-col md:flex-row items-center">
            <Datepicker
              inline
              theme={"dark"}
              title="Tanggal mulai"
              maxDate={to ? new Date(to) : new Date()}
              defaultDate={from ? new Date(from) : new Date()}
              showClearButton={false}
              onSelectedDateChanged={(date) => {
                setFrom(new Date(date).toLocaleString());
              }}
            />
            <Datepicker
              inline
              title="Tanggal akhir"
              minDate={from ? new Date(from) : new Date()}
              defaultDate={to ? new Date(to) : new Date()}
              showClearButton={false}
              onSelectedDateChanged={(date) => {
                setTo(new Date(date).toLocaleString());
              }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="flex flex-row justify-between">
          <div className="flex flex-row space-x-2">
            <Button onClick={handleSet} color={"dark"}>
              Terapkan
            </Button>
            <Button
              color="danger"
              className="bg-red-600 text-white hover:bg-red-700"
              onClick={() => {
                setFrom("");
                setTo("");
                setShouldRefetch(true);
                setOpenModal(false);
              }}
            >
              Reset
            </Button>
          </div>
          <Button color="gray" className="bg-gray-300" onClick={() => setOpenModal(false)}>
            Batal
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
