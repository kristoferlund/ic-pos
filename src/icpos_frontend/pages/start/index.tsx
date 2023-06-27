import LoginButton from "./components/LoginButton";
import MonitorButton from "./components/MonitorButton";
import { Navigate } from "@tanstack/router";
import { ReactNode } from "react";
import { useBackend } from "../../hooks/useBackend";

export default function StartPage(): ReactNode {
  const { merchantState } = useBackend();

  // If the merchant state is initialized it means that the backend actor is available
  if (merchantState.initialized) {
    // If the merchant is initialized, navigate to the merchant page
    if (merchantState.merchant) {
      return <Navigate to="/merchant" />;
    }
    // Otherwise, navigate to the config page to create a merchant
    return <Navigate to="/initial-config" />;
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-5">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <LoginButton />
      <MonitorButton />
    </div>
  );
}
