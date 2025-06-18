import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/lib/auth/auth-slicer";
import portfolioReducer from "@/lib/portfolio/portfolio-slicer";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      portfolio: portfolioReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
