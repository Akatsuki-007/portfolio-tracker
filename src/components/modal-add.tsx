import {
  Modal,
  modalTheme,
  ModalBody,
  Datepicker,
  datePickerTheme,
  Button,
} from "flowbite-react";
import { useState, useEffect } from "react";

export default function ModalAdd({
  openModal,
  setOpenModal,
}: {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [search, setSearch] = useState("");
  return (
    <Modal
      show={openModal}
      size="md"
      onClose={() => setOpenModal(false)}
      dismissible
      theme={{
        ...modalTheme,
        root: {
          ...modalTheme.root,
          show: {
            ...modalTheme.root.show,
            on: "bg-gray-900/80 dark:bg-gray-900/80",
          },
        },
        content: {
          ...modalTheme.content,
          inner: "bg-gray-700 dark:bg-gray-700",
        },
      }}
    >
      <h3 className="text-center pt-4 font-semibold text-base">
        Add Transaction
      </h3>
      <ModalBody>
        <div className="flex flex-col space-y-5">
          <div className="flex justify-center flex-row gap-2">
            <Button className="cursor-pointer w-full bg-blue-600 dark:bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-700">
              Buy
            </Button>
            <Button
              color="red"
              className="cursor-pointer w-full bg-red-600 dark:bg-red-600 hover:bg-red-700 dark:hover:bg-red-700"
            >
              Sell
            </Button>
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
            <Datepicker
              theme={{
                ...datePickerTheme,
                root: { ...datePickerTheme.root },
                popup: {
                  ...datePickerTheme.popup,
                  root: {
                    ...datePickerTheme.popup.root,
                    inner: "bg-gray-700 dark:bg-gray-700",
                  },
                  header: {
                    ...datePickerTheme.popup.header,
                    title: "text-white dark:text-white",
                    selectors: {
                      ...datePickerTheme.popup.header.selectors,
                      button: {
                        ...datePickerTheme.popup.header.selectors.button,
                        base: "bg-gray-700 dark:bg-gray-700 text-white dark:text-white hover:bg-gray-600 dark:hover:bg-gray-600",
                      },
                    },
                  },
                  footer: {
                    ...datePickerTheme.popup.footer,
                    button: {
                      ...datePickerTheme.popup.footer.button,
                      today:
                        "bg-primary-600 dark:bg-primary-600 hover:bg-primary-700 dark:hover:bg-primary-700",
                      clear:
                        "border-gray-600 dark:border-gray-600 bg-gray-700 dark:bg-gray-700 text-white dark:text-white hover:bg-gray-600 dark:hover:bg-gray-600",
                    },
                  },
                },
                views: {
                  ...datePickerTheme.views,
                  days: {
                    ...datePickerTheme.views.days,
                    header: {
                      ...datePickerTheme.views.days.header,
                      title: "text-gray-400 dark:text-gray-400",
                    },
                    items: {
                      ...datePickerTheme.views.days.items,
                      item: {
                        ...datePickerTheme.views.days.items.item,
                        base: "text-white dark:text-white hover:bg-gray-600 dark:hover:bg-gray-600",
                      },
                    },
                  },
                  months: {
                    ...datePickerTheme.views.months,
                    items: {
                      ...datePickerTheme.views.months.items,
                      item: {
                        ...datePickerTheme.views.months.items.item,
                        base: "text-white dark:text-white hover:bg-gray-600 dark:hover:bg-gray-600",
                      },
                    },
                  },
                  years: {
                    ...datePickerTheme.views.years,
                    items: {
                      ...datePickerTheme.views.years.items,
                      item: {
                        ...datePickerTheme.views.years.items.item,
                        base: "text-white dark:text-white hover:bg-gray-600 dark:hover:bg-gray-600",
                      },
                    },
                  },
                  decades: {
                    ...datePickerTheme.views.decades,
                    items: {
                      ...datePickerTheme.views.decades.items,
                      item: {
                        ...datePickerTheme.views.decades.items.item,
                        base: "text-white dark:text-white hover:bg-gray-600 dark:hover:bg-gray-600",
                      },
                    },
                  },
                },
              }}
            />
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
    </Modal>
  );
}
