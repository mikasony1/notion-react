import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="w-full flex flex-col items-center">
      <p className="text-2xl">404</p>
      <h2 className="text-4xl mb-2">Page not found</h2>
      <p className="text-xl no-underline hover: underline">
        <Link to="/">Go Home</Link>
      </p>
    </div>
  );
}
