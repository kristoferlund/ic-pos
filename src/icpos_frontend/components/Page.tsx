import { Navigate } from "@tanstack/router";
import { ReactNode } from "react";
import { useAuth } from "../auth/hooks/useAuth";

type PageProps = {
  children: ReactNode;
  authentication?: boolean;
};

export default function Page(props: PageProps) {
  const { children, authentication = true } = props;
  const { hasLoggedIn } = useAuth();

  // If page requires authentication and user has not logged in, redirect to home
  if (authentication && !hasLoggedIn) {
    return <Navigate to="/" />;
  }

  return children;
}
