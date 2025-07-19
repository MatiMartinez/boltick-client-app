import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useSession from "../hooks/useSession";

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { isConnected } = useSession();

  if (!isConnected) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
