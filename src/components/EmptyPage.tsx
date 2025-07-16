import { Link } from "react-router-dom";
import { URLEndPoint } from "../shared/auth-modal";

function EmptyPage({ text }: { text?: string }) {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">{text}</h1>
        <Link
          to={URLEndPoint.home}
          className="text-blue-500 hover:underline text-lg"
        >
          Continue Shopping →
        </Link>
      </div>
    </div>
  );
}

export default EmptyPage;
