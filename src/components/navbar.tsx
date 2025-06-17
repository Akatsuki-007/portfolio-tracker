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
} from "flowbite-react";
import Image from "next/image";
import Logo from "../../public/logo-3.png";
import ModalAuth from "./navbar-auth";

function Navbar() {
  const [open, setOpen] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<string>("");

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
          }}
          className="container mx-auto border-b-2 border-gray-300"
        >
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-px text-lg font-bold leading-4 font-nunito tracking-tight"
            >
              <Image src={Logo} alt="Logo" width={50} height={50} />
              <div className="flex flex-col ">
                <h1>Portfolio</h1> <h1 className="-skew-x-12">Tracker</h1>
              </div>
            </Link>
            <ul className="hidden md:flex items-center gap-4 *:text-lg *:font-bold *:font-nunito *:hover:text-[#3861FB]">
              <li>
                <Link href="/">Cryptocurrency</Link>
              </li>
              <li>
                <Link href="/" className="flex items-center gap-0.5">
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
            </ul>
          </div>
          <NavbarToggle />
          <div className="hidden md:flex items-center gap-4">
            <Button
              className="cursor-pointer bg-[#3861FB] hover:bg-[#3861FB]/95 active:bg-[#1145d3] font-semibold font-sans focus:ring-0 rounded-lg"
              onClick={() => setOpenModal("login")}
            >
              Log In
            </Button>
            <Popover
              theme={{
                ...popoverTheme,
                content: "shadow-lg",
              }}
              open={open}
              onOpenChange={setOpen}
              content={
                <div className="flex w-72 flex-col gap-4 p-4 text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-lg">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="cursor-pointer bg-[#3861FB] hover:bg-[#3861FB]/95 active:bg-[#1145d3] font-semibold font-sans focus:ring-0 rounded-lg"
                      onClick={() => setOpenModal("login")}
                    >
                      Log In
                    </Button>
                    <Button
                      size="sm"
                      className="cursor-pointer hover:bg-gray-50/25 box-border hover:border-[#3861FB] border-2 font-semibold font-sans focus:ring-0 text-black hover:text-black active:text-[#3861FB] rounded-lg"
                      outline
                      onClick={() => setOpenModal("signup")}
                    >
                      Sign Up
                    </Button>
                    {/* <Button
                    size="sm"
                    className="cursor-pointer w-full bg-red-600 dark:bg-red-600 hover:bg-red-600/95 dark:hover:bg-red-600/95 active:bg-red-700 dark:active:bg-red-700 font-semibold font-sans focus:ring-0 rounded-lg"
                  >
                    Log Out
                  </Button> */}
                  </div>
                </div>
              }
            >
              <Button className="cursor-pointer focus:ring-0 p-0 rounded-full w-10 h-10 overflow-hidden">
                <Image
                  height={40}
                  width={40}
                  className="rounded-full w-full h-full object-cover border-2 border-[#3861FB]"
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
                  alt="Avatar"
                />
              </Button>
            </Popover>
          </div>
          <NavbarCollapse>
            <NavbarLink as={Link} href="/">
              Cryptocurrency
            </NavbarLink>
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
            <Button
              size="sm"
              className="cursor-pointer bg-[#3861FB] hover:bg-[#3861FB]/95 active:bg-[#1145d3] font-semibold font-sans focus:ring-0 rounded-lg"
              onClick={() => setOpenModal("login")}
            >
              Log In
            </Button>
            <Button
              size="sm"
              className="cursor-pointer hover:bg-gray-50/25 box-border hover:border-[#3861FB] border-2 font-semibold font-sans focus:ring-0 text-black hover:text-black active:text-[#3861FB] rounded-lg"
              outline
              onClick={() => setOpenModal("signup")}
            >
              Sign Up
            </Button>
          </NavbarCollapse>
        </FlowbiteNavbar>
      </div>

      <ModalAuth openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
}

export default Navbar;
