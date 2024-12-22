import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../components/UserContextProvider";

export default function Header() {
  const userContext = useContext(UserContext);

  const handleLogout = () => {
    userContext.onChange(null);
  };

  return (
    <div className="flex justify-between items-center h-16  px-8">
      <span className="text-lg font-medium">
        Hello, {userContext.user.email}
      </span>
      <div className="flex gap-12">
        <span className="text-lg font-medium">
          <Link to="/">About</Link>
        </span>
        <span className="text-lg font-medium">
          <Link to="/notes">Notes</Link>
        </span>

        <a href="" className="text-lg font-medium" onClick={handleLogout}>
          Log out
        </a>
      </div>
    </div>
  );
}
