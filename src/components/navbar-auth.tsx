import React, { useState } from "react";
import {
  Modal,
  modalTheme,
  ModalBody,
  ModalFooter,
  Label,
  TextInput,
  textInputTheme,
  Button,
} from "flowbite-react";
import { X } from "lucide-react";

function ModalAuth({
  openModal,
  setOpenModal,
}: {
  openModal: string;
  setOpenModal: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Modal
      theme={{
        ...modalTheme,
      }}
      size="md"
      show={openModal ? true : false}
    >
      <div className="flex items-start justify-between rounded-t border-b p-5 dark:border-gray-600">
        <div></div>
        <div className="flex items-start gap-5 **:data-cursor:cursor-pointer *:text-xl *:font-bold *:font-nunito *:flex *:flex-col *:items-center">
          {[
            { openModal: "login", name: "Log In" },
            { openModal: "signup", name: "Sign Up" },
          ].map((v) => (
            <span
              key={v.openModal}
              className={`${openModal !== v.openModal && "text-gray-500"}`}
            >
              <h1 data-cursor onClick={() => setOpenModal(v.openModal)}>
                {v.name}
              </h1>
              {openModal === v.openModal && (
                <div className="w-1/2 h-1.5 bg-[#3861FB] rounded-full"></div>
              )}
            </span>
          ))}
        </div>
        <button
          onClick={() => setOpenModal("")}
          className="cursor-pointer inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <X />
        </button>
      </div>
      <ModalBody>
        <div className="space-y-6">
          <form className="flex max-w-md flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label className="font-semibold font-sans" htmlFor="email1">
                  Email Address
                </Label>
              </div>
              <TextInput
                id="email1"
                type="email"
                placeholder="name@flowbite.com"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label className="font-semibold font-sans" htmlFor="password1">
                  Password
                </Label>
              </div>
              <div className="relative w-full">
                <TextInput
                  theme={{ ...textInputTheme }}
                  id="password1"
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full"
                />
                <button
                  type="button"
                  className="cursor-pointer absolute right-3 inset-y-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </div>
      </ModalBody>
      {/* <ModalFooter>
        <Button onClick={() => setOpenModal("")}>I accept</Button>
        <Button color="alternative" onClick={() => setOpenModal("")}>
          Decline
        </Button>
      </ModalFooter> */}
    </Modal>
  );
}

export default ModalAuth;
