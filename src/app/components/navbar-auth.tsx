import React, { useState } from "react";
import {
  Modal,
  modalTheme,
  ModalBody,
  Label,
  TextInput,
  textInputTheme,
  Button,
} from "flowbite-react";
import Image from "next/image";
import { X, EyeOff, Eye } from "lucide-react";

function ModalAuth({
  openModal,
  setOpenModal,
}: {
  openModal: string;
  setOpenModal: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [enable, setEnable] = useState<boolean>(false);

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
        <div className="space-y-4">
          {openModal === "signup" && (
            <>
              <Button
                size="sm"
                className="cursor-pointer w-full flex items-center gap-2 font-semibold font-sans focus:ring-0 rounded-lg"
                outline
              >
                <Image
                  src="https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp=s96-fcrop64=1,00000000ffffffff-rw"
                  alt="Logo"
                  className="w-4 h-4"
                  width={50}
                  height={50}
                />
                Continue with Google
              </Button>{" "}
              <div className="flex justify-center items-center gap-2">
                <div className="w-full h-px bg-gray-200"></div>
                <h1 className="text-nowrap font-semibold font-sans uppercase">
                  Or continue with email
                </h1>
                <div className="w-full h-px bg-gray-200"></div>
              </div>
            </>
          )}
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
                    <EyeOff className="text-gray-400 h-5 w-5" />
                  ) : (
                    <Eye className="text-gray-400 h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            <Button size="sm" type="submit">
              {openModal === "login" ? "Log In" : "Create an account"}
            </Button>
          </form>
          {openModal === "login" && (
            <>
              <div className="flex justify-center items-center gap-2">
                <div className="w-full h-px bg-gray-200"></div>
                <h1 className="font-semibold font-sans uppercase">Or</h1>
                <div className="w-full h-px bg-gray-200"></div>
              </div>
              <Button
                size="sm"
                className="cursor-pointer w-full flex items-center gap-2 font-semibold font-sans focus:ring-0 rounded-lg"
                outline
              >
                <Image
                  src="https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp=s96-fcrop64=1,00000000ffffffff-rw"
                  alt="Logo"
                  className="w-4 h-4"
                  width={50}
                  height={50}
                />
                Continue with Google
              </Button>
            </>
          )}
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
