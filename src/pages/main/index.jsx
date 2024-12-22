import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../components/UserContextProvider";

export default function Main() {
  const userContext = useContext(UserContext);
  const { pathname } = useLocation();
  const location = useLocation();

  return (
    <nav className=" bg-slate-300 ">
      <div className="w-4/5 h-lvh mx-auto">
        {userContext.user && pathname !== "/error" && <Header />}
        <div className="h-4/5 flex items-center">
          <Outlet />
        </div>
        <Footer />
      </div>
    </nav>
  );
}
