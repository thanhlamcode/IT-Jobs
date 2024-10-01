import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../../helpers/cookie";

function Private() {
  const token = getCookie("token");
  return <>{token ? <Outlet /> : <Navigate to="/login" />}</>;
}

export default Private;
