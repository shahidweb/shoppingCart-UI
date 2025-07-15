import { Link } from "react-router-dom";
import { URLEndPoint } from "../shared/auth-modal";

const NotFound = () => {
  return (
    <div
      className="flex flex-col justify-center items-center bg-gray-50 text-center"
      style={{ minHeight: "calc(100vh - 60px)" }}
    >
      <h1 className="text-6xl font-bold text-indigo-600 mb-4">404</h1>
      <p className="text-4xl font-semibold mb-2">Page Not Found</p>
      <p className="text-gray-600 mb-6">
        Sorry, the page you’re looking for doesn’t exist or was moved.
      </p>
      <Link
        to={URLEndPoint.home}
        className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
