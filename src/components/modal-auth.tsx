import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalBody,
  Label,
  TextInput,
  textInputTheme,
  Button,
} from "flowbite-react";
import Image from "next/image";
import { X, EyeOff, Eye } from "lucide-react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "@/config/firebase";

function ModalAuth({
  openModal,
  setOpenModal,
  setOpenPopup,
}: {
  openModal: string;
  setOpenModal: React.Dispatch<React.SetStateAction<string>>;
  setOpenPopup: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [showPasswordLogin, setShowPasswordLogin] = useState(false);
  const [showPasswordSignup, setShowPasswordSignup] = useState(false);
  const [form, setForm] = useState({
    login: {
      email: "",
      password: "",
    },
    signup: {
      email: "",
      password: "",
    },
  });
  const [errorForm, setErrorForm] = useState<{
    login: {
      email: string;
      password: string;
    };
    signup: {
      email: string;
      password: string;
    };
    google: string;
  }>({
    login: {
      email: "",
      password: "",
    },
    signup: {
      email: "",
      password: "",
    },
    google: "",
  });

  const handleAuth = async () => {
    try {
      setErrorForm({
        login: {
          email: "",
          password: "",
        },
        signup: {
          email: "",
          password: "",
        },
        google: "",
      });

      if (openModal === "login") {
        await signInWithEmailAndPassword(
          auth,
          form.login.email,
          form.login.password
        ).then(() => {
          Promise.resolve().then(() => {
            setTimeout(() => {
              setOpenPopup(
                "Account created successfully! You can now log in with your email and password."
              );
            }, 1000);
          });
        });
      } else {
        await createUserWithEmailAndPassword(
          auth,
          form.signup.email,
          form.signup.password
        ).then(() => {
          Promise.resolve().then(() => {
            setTimeout(() => {
              setOpenPopup(
                "Account created successfully! You can now log in with your email and password."
              );
            }, 1000);
          });
        });
      }
    } catch (error) {
      if (error && typeof error === "object" && "code" in error) {
        if (error.code === "auth/invalid-credential") {
          setErrorForm((prev) => ({
            ...prev,
            [openModal]: {
              ...prev[openModal as "login" | "signup"],
              password: "Invalid email or password",
            },
          }));
        } else if (error.code === "auth/weak-password") {
          setErrorForm((prev) => ({
            ...prev,
            [openModal]: {
              ...prev[openModal as "login" | "signup"],
              password: "Password should be at least 6 characters!",
            },
          }));
        } else if (error.code === "auth/email-already-in-use") {
          setErrorForm((prev) => ({
            ...prev,
            [openModal]: {
              ...prev[openModal as "login" | "signup"],
              email: "Email already in use / already registered",
            },
          }));
        } else if (error.code === "auth/invalid-email") {
          setErrorForm((prev) => ({
            ...prev,
            [openModal]: {
              ...prev[openModal as "login" | "signup"],
              email: "Invalid email format",
            },
          }));
        } else if (error.code === "auth/too-many-requests") {
          setErrorForm((prev) => ({
            ...prev,
            [openModal]: {
              ...prev[openModal as "login" | "signup"],
              email: "Too many requests, please try again later",
            },
          }));
        } else {
          setErrorForm((prev) => ({
            ...prev,
            [openModal]: {
              ...prev[openModal as "login" | "signup"],
              email: "An error occurred, please try again",
            },
          }));
          console.error("Error during authentication:", error);
        }
      }
    }
  };

  const handleOAuth = async () => {
    try {
      await signInWithPopup(auth, provider).then(() => {
        Promise.resolve().then(() => {
          setTimeout(() => {
            setOpenPopup("Successfully logged in with Google!");
          }, 1000);
        });
      });
    } catch (error) {
      if (error && typeof error === "object" && "code" in error) {
        if (error.code === "auth/popup-closed-by-user") {
          setErrorForm({
            ...errorForm,
            google: "Popup closed by user.",
          });
        } else if (error.code === "auth/cancelled-popup-request") {
          setErrorForm({
            ...errorForm,
            google: "Popup request cancelled.",
          });
        } else {
          setErrorForm({
            ...errorForm,
            google: "An error occurred, please try again.",
          });
          console.error("Error during OAuth authentication:", error);
        }
      }
    }
  };

  return (
    <Modal size="md" show={openModal ? true : false}>
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
              {errorForm.google && (
                <p className="text-red-500 text-sm text-center">
                  {errorForm.google}
                </p>
              )}
              <Button
                size="sm"
                className="cursor-pointer w-full flex items-center gap-2 font-semibold font-sans focus:ring-0 rounded-lg"
                outline
                onClick={handleOAuth}
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
              <div className="flex justify-center items-center gap-2">
                <div className="w-full h-px bg-gray-200"></div>
                <h1 className="text-nowrap font-semibold font-sans uppercase">
                  Or continue with email
                </h1>
                <div className="w-full h-px bg-gray-200"></div>
              </div>
            </>
          )}
          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              handleAuth();
            }}
            className="flex max-w-md flex-col gap-4"
          >
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
                color={
                  openModal === "login"
                    ? errorForm.login.email
                      ? "failure"
                      : ""
                    : errorForm.signup.email
                    ? "failure"
                    : ""
                }
                value={
                  openModal === "login" ? form.login.email : form.signup.email
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    [openModal]: {
                      ...(openModal === "login" ? form.login : form.signup),
                      email: e.target.value,
                    },
                  })
                }
              />
              {/* Error message for email */}
              {openModal === "login" && errorForm.login.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errorForm.login.email}
                </p>
              )}
              {openModal === "signup" && errorForm.signup.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errorForm.signup.email}
                </p>
              )}
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
                  type={
                    openModal === "login"
                      ? showPasswordLogin
                        ? "text"
                        : "password"
                      : showPasswordSignup
                      ? "text"
                      : "password"
                  }
                  required
                  color={
                    openModal === "login"
                      ? errorForm.login.password && "failure"
                      : errorForm.signup.password && "failure"
                  }
                  value={
                    openModal === "login"
                      ? form.login.password
                      : form.signup.password
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      [openModal]: {
                        ...(openModal === "login" ? form.login : form.signup),
                        password: e.target.value,
                      },
                    })
                  }
                  className="w-full"
                />
                <button
                  type="button"
                  className="cursor-pointer absolute right-3 inset-y-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  onClick={() =>
                    openModal === "login"
                      ? setShowPasswordLogin((prev) => !prev)
                      : setShowPasswordSignup((prev) => !prev)
                  }
                >
                  {openModal === "login" ? (
                    showPasswordLogin ? (
                      <Eye className="text-gray-400 h-5 w-5" />
                    ) : (
                      <EyeOff className="text-gray-400 h-5 w-5" />
                    )
                  ) : showPasswordSignup ? (
                    <Eye className="text-gray-400 h-5 w-5" />
                  ) : (
                    <EyeOff className="text-gray-400 h-5 w-5" />
                  )}
                </button>
              </div>
              {/* Error message for password */}
              {openModal === "login" && errorForm.login.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errorForm.login.password}
                </p>
              )}
              {openModal === "signup" && errorForm.signup.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errorForm.signup.password}
                </p>
              )}
            </div>
            <Button
              size="sm"
              type="submit"
              disabled={
                openModal === "login"
                  ? form.login.email === "" || form.login.password === ""
                  : form.signup.email === "" || form.signup.password === ""
              }
            >
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
              {errorForm.google && (
                <p className="text-red-500 text-sm text-center">
                  {errorForm.google}
                </p>
              )}
              <Button
                size="sm"
                className="cursor-pointer w-full flex items-center gap-2 font-semibold font-sans focus:ring-0 rounded-lg"
                outline
                onClick={handleOAuth}
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
    </Modal>
  );
}

export default ModalAuth;
