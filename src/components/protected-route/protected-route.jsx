import { Route, Routes, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, redirectCondition, redirectPath, ...rest }) => {
  return (
    <Routes>
      <Route {...rest} element={!redirectCondition ? children : <Navigate to={redirectPath} />} />
    </Routes>
  );
};

export default ProtectedRoute;