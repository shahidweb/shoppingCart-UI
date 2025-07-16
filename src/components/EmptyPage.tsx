import { Link } from "react-router-dom";
import { URLEndPoint } from "../shared/auth-modal";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";

function EmptyPage({
  text,
  description,
}: {
  text?: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center min-cal-screen ">
      <div className="w-16 h-16 mb-4 text-indigo-600">
        <ShoppingBagIcon className="w-full h-full" />
      </div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{text}</h2>
      <p className="text-gray-500 mb-6">{description}</p>
      <Link
        to={URLEndPoint.home}
        className="inline-flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
      >
        Start shopping
        <span className="ml-1">→</span>
      </Link>
    </div>
  );
}

export default EmptyPage;
