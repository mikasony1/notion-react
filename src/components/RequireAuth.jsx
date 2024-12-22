import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContextProvider";

export default function RequireAuth({ children }) {
  const userContext = useContext(UserContext);

  if (userContext.loading) {
    return <div>Loading...</div>;
  }

  if (!userContext.user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
