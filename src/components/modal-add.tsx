import { Modal, ModalBody, Datepicker, Button } from 'flowbite-react';
import { useState, useEffect } from 'react';

export default function ModalAdd({
  openModal,
  setOpenModal,
}: {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [search, setSearch] = useState('');
  return (
    <Modal show={openModal} size="md" onClose={() => setOpenModal(false)}>
      <div className=" bg-gray-900 text-white rounded-lg px-6 pt-4 pb-6">
        <h3 className="text-center pt-4 font-semibold text-base">
          Add Transaction
        </h3>
        <ModalBody>
          <div className="flex flex-col space-y-5">
            <div className="flex justify-center flex-row gap-2">
              <Button className="rounded-2xl">Buy</Button>
              <Button className="rounded-2xl">Sell</Button>
            </div>
            <div>
              <input
                type="text"
                placeholder="Search"
                className=" w-full border border-gray-300 rounded-2xl text-center p-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400 py-2"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:basis-1/2">
                <input
                  type="number"
                  placeholder="Quantity"
                  className="w-full border border-gray-300 rounded-2xl text-center p-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="w-full sm:basis-1/2">
                <input
                  type="number"
                  placeholder="Price Per Coin"
                  className="w-full border border-gray-300 rounded-2xl text-center p-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
            <div>
              <Datepicker className="bg-gray-800" />
            </div>
            <div>
              <input
                type="text"
                className="w-full py-4 border border-gray-300 rounded-2xl text-center p-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <Button className="w-full rounded-2xl">Add Transaction</Button>
            </div>
          </div>
        </ModalBody>
      </div>
    </Modal>
  );
}
