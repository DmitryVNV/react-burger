import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children, onlyAuth = true }) => {
  const { userData } = useSelector((store) => store.user);
  const location = useLocation();

  console.log(userData.name);

  if (!onlyAuth && userData.name !== "") {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (onlyAuth && userData.name === "") {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export const ForAuth = ProtectedRoute;
export const ForNonAuth = ({ children }) => <ProtectedRoute children={children} onlyAuth={false} />;

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
  onlyAuth: PropTypes.bool,
};