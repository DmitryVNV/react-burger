import { FC, ReactChild } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

type TProtectedRouteProps = {
  children?: ReactChild;
  onlyAuth?: boolean;
};

const ProtectedRoute: FC<TProtectedRouteProps> = ({ children, onlyAuth = true }) => {
  const { userData } = useSelector((store: any) => store.user);
  const location = useLocation();

  if (!onlyAuth && userData.name !== "") {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (onlyAuth && userData.name === "") {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <>{children}</>;
};

export const ForAuth = ProtectedRoute;
export const ForNonAuth: FC<TProtectedRouteProps> = ({ children }) => <ProtectedRoute children={children} onlyAuth={false} />;