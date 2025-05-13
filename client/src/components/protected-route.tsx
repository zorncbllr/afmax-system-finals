import { Navigate } from "react-router";
import { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  if (!localStorage.getItem("accessToken")) {
    return <Navigate to={"/auth/sign-in"} replace={true} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
