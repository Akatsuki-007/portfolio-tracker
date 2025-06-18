"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Navbar as FlowbiteNavbar,
  NavbarToggle,
  NavbarCollapse,
  NavbarLink,
  navbarTheme,
  Button,
  Popover,
  popoverTheme,
  Modal,
  ModalHeader,
  ModalBody,
  HR,
} from "flowbite-react";
import Image from "next/image";
import Logo from "../../../public/logo-3.png";
import IconProfile from "../../../public/user.png";
import ModalAuth from "./modal-auth";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";

import { useAppSelector } from "@/lib/hooks";

function Navbar() {
  const [open, setOpen] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<string>("");
  const [openPopup, setOpenPopup] = useState<string>("");

  const { user } = useAppSelector((state) => state.auth);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setOpen(false);
      setOpenModal("");
    }
  };

  return (
    <>
      <div>
        <FlowbiteNavbar
          theme={{
            ...navbarTheme,
            root: { ...navbarTheme.root, base: "dark:bg-transparent bg-white" },
            collapse: {
              ...navbarTheme.collapse,
              base: "md:hidden lg:hidden",
              list: "space-y-2",
            },
            link: {
              ...navbarTheme.link,
              active: {
                ...navbarTheme.link.active,
                off: "border-gray-700 dark:border-gray-700 text-gray-400 dark:text-gray-400 hover:text-white dark:hover:text-white hover:bg-gray-700 dark:hover:bg-gray-700",
              },
            },
            toggle: {
              ...navbarTheme.toggle,
              base: "text-gray-400 dark:text-gray-400 hover:bg-gray-700 dark:hover:bg-gray-700 focus:ring-gray-600 dark:focus:ring-gray-600",
            },
          }}
          className="container mx-auto border-b-2 border-gray-800 dark:border-gray-800 bg-[#0c1421]"
        >
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-px text-lg font-bold leading-4 font-nunito tracking-tight text-[#ededed]"
            >
              <Image src={Logo} alt="Logo" width={50} height={50} />
              <div className="flex flex-col ">
                <h1 className="text-[#ededed]">Portfolio</h1>{" "}
                <h1 className="-skew-x-12 text-[#ededed]">Tracker</h1>
              </div>
            </Link>
            <ul className="hidden md:flex items-center gap-4 *:text-lg *:font-bold *:font-nunito *:hover:text-[#3861FB] *:text-[#ededed]">
              <li>
                <Link href="/">Cryptocurrency</Link>
              </li>
              {user.uid !== "" && (
                <li>
                  <Link
                    href="/portfolio"
                    className="flex items-center gap-0.5 text-[#ededed]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 13.5a8.25 8.25 0 0 1 8.25-8.25.75.75 0 0 1 .75.75v6.75H18a.75.75 0 0 1 .75.75 8.25 8.25 0 0 1-16.5 0Z"
                        clipRule="evenodd"
                      />
                      <path
                        fillRule="evenodd"
                        d="M12.75 3a.75.75 0 0 1 .75-.75 8.25 8.25 0 0 1 8.25 8.25.75.75 0 0 1-.75.75h-7.5a.75.75 0 0 1-.75-.75V3Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Portfolio
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <NavbarToggle />
          <div className="hidden md:flex items-center gap-4">
            {user.uid === "" && (
              <Button
                className="cursor-pointer bg-[#3861FB] hover:bg-[#3861FB]/95 active:bg-[#1145d3] font-semibold font-sans focus:ring-0 rounded-lg"
                onClick={() => setOpenModal("login")}
              >
                Log In
              </Button>
            )}
            <Popover
              theme={{
                ...popoverTheme,
                base: "bg-gray-800 border border-gray-600 dark:border-gray-600",
                content: "shadow-lg",
                arrow: {
                  ...popoverTheme.arrow,
                  base: "bg-gray-800 border-gray-600 mix-blend-color",
                },
              }}
              open={open}
              onOpenChange={setOpen}
              content={
                <div className="flex w-60 flex-col gap-4 p-4 text-sm text-gray-500 dark:text-gray-400 bg-gray-800 dark:bg-gray-800 rounded-lg">
                  {user.uid === "" ? (
                    <>
                      <Button
                        size="sm"
                        className="cursor-pointer bg-[#3861FB] hover:bg-[#3861FB]/95 hover:dark:bg-[#3861FB]/95 active:bg-[#1145d3] font-semibold font-sans focus:ring-0 rounded-lg"
                        onClick={() => setOpenModal("login")}
                      >
                        Log In
                      </Button>
                      <Button
                        size="sm"
                        className="cursor-pointer hover:bg-[#3861FB] box-border border-[#3861FB] hover:border-[#3861FB] border-2 font-semibold font-sans focus:ring-0 text-[#5f81fc] dark:text-[#5f81fc] hover:text-white active:text-white rounded-lg"
                        outline
                        onClick={() => setOpenModal("signup")}
                      >
                        Sign Up
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2">
                        <Image
                          className="rounded-full"
                          height={40}
                          width={40}
                          src={user.photoURL || IconProfile}
                          alt="User Avatar"
                        />
                        <h1 className="text-gray-400 dark:text-gray-400 text-sm font-medium line-clamp-1">
                          {user.email}
                        </h1>
                      </div>
                      <HR className="my-0 bg-gray-700 dark:bg-gray-700" />
                      <Button
                        size="sm"
                        className="cursor-pointer w-full bg-red-600 dark:bg-red-600 hover:bg-red-600/95 dark:hover:bg-red-600/95 active:bg-red-700 dark:active:bg-red-700 font-semibold font-sans focus:ring-0 rounded-lg"
                        onClick={handleSignOut}
                      >
                        Log Out
                      </Button>
                    </>
                  )}
                </div>
              }
            >
              <Button className="cursor-pointer focus:ring-0 p-0 rounded-full w-10 h-10 overflow-hidden border-2 border-gray-600">
                <Image
                  height={40}
                  width={40}
                  className="rounded-full w-full h-full object-cover"
                  src={user.photoURL !== "" ? user.photoURL : IconProfile}
                  alt="Avatar"
                />
              </Button>
            </Popover>
          </div>
          <NavbarCollapse>
            <NavbarLink as={Link} href="/">
              Cryptocurrency
            </NavbarLink>
            {user.uid !== "" && (
              <NavbarLink
                as={Link}
                href="/portfolio"
                className="flex items-center gap-0.5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 13.5a8.25 8.25 0 0 1 8.25-8.25.75.75 0 0 1 .75.75v6.75H18a.75.75 0 0 1 .75.75 8.25 8.25 0 0 1-16.5 0Z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M12.75 3a.75.75 0 0 1 .75-.75 8.25 8.25 0 0 1 8.25 8.25.75.75 0 0 1-.75.75h-7.5a.75.75 0 0 1-.75-.75V3Z"
                    clipRule="evenodd"
                  />
                </svg>
                Portfolio
              </NavbarLink>
            )}
            {user.uid === "" ? (
              <>
                <Button
                  size="sm"
                  className="cursor-pointer bg-[#3861FB] hover:bg-[#3861FB]/95 active:bg-[#1145d3] font-semibold font-sans focus:ring-0 rounded-lg"
                  onClick={() => setOpenModal("login")}
                >
                  Log In
                </Button>
                <Button
                  size="sm"
                  className="cursor-pointer hover:bg-[#3861FB] box-border border-[#3861FB] hover:border-[#3861FB] border-2 font-semibold font-sans focus:ring-0 text-[#5f81fc] dark:text-[#5f81fc] hover:text-white active:text-[#3861FB] rounded-lg"
                  outline
                  onClick={() => setOpenModal("signup")}
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <Button
                size="sm"
                className="cursor-pointer w-full bg-red-600 dark:bg-red-600 hover:bg-red-600/95 dark:hover:bg-red-600/95 active:bg-red-700 dark:active:bg-red-700 font-semibold font-sans focus:ring-0 rounded-lg"
                onClick={handleSignOut}
              >
                Log Out
              </Button>
            )}
          </NavbarCollapse>
        </FlowbiteNavbar>
      </div>

      {user.uid === "" && (
        <ModalAuth
          openModal={openModal}
          setOpenModal={setOpenModal}
          setOpenPopup={setOpenPopup}
        />
      )}

      <Modal
        show={openPopup !== ""}
        size="md"
        popup
        onClose={() => setOpenPopup("")}
      >
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="mx-auto mb-4 h-15 w-15 text-green-400 dark:text-green-400"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                clipRule="evenodd"
              />
            </svg>
            <h1 className="text-2xl font-semibold dark:text-white text-gray-900 mb-2">
              You successfully logged in!
            </h1>
            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
              {openPopup}
            </p>
            <Button
              color="blue"
              className="cursor-pointer w-full mt-8"
              onClick={() => setOpenPopup("")}
            >
              Yes, I'm sure
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

export default Navbar;
