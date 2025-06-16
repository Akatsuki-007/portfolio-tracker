"use client";
import React, { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/lib/store";
import { useAppDispatch } from "@/lib/hooks";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase";
import { setUser } from "@/lib/auth/auth-slicer";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>(undefined);
  // const dispatch = useAppDispatch();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (storeRef.current) {
        if (user) {
          const userData = {
            uid: user.uid,
            email: user.email,
            photoURL: user.photoURL,
            // tambah sesuai kebutuhan
          };
          storeRef.current.dispatch(setUser(userData));
        } else {
          storeRef.current.dispatch(setUser(null));
        }
      }
    });
    return () => unsubscribe();
  }, [storeRef.current]);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
