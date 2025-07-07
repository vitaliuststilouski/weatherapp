import { Provider } from "react-redux";
import { store } from "@/store/store";
import { ReactNode } from "react";

export const AllProviders = ({ children }: { children: ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);
