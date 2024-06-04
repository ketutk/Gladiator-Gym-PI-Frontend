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
              labelTodayButton="Reset"
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
              labelTodayButton="Reset"
              onSelectedDateChanged={(date) => {
                setTo(new Date(date).toLocaleString());
              }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSet} color={"dark"}>
            Terapkan
          </Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Batal
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
