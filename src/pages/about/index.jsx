import { Link } from "react-router-dom";
import { UserContext } from "../../components/UserContextProvider";
import { useContext } from "react";

export default function About() {
  const userContext = useContext(UserContext);

  return (
    <div className="container">
      <div className="h-full flex flex-col items-center justify-center bg-slate-300">
        <h2 className="text-5xl mb-20">About me</h2>
        <span className="text-lg">Email: {userContext.user.email}</span>
        <span className="text-lg mb-20">
          Date sign up:
          {new Date(userContext.user.creationDate).toLocaleDateString()}
        </span>
        <button className="py-1.5 px-14 bg-slate-400 text-xl font-medium">
          <Link to="/notes">Go to notes</Link>
        </button>
      </div>
    </div>
  );
}
