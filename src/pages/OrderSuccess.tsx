import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthRedirect } from "../hooks/useAuthRedirect";

const OrderSuccess = () => {
  useAuthRedirect();
  const navigate = useNavigate()
  useEffect(() => {
    const flag = localStorage.getItem("orderSuccess");
    if (!flag) {
      navigate("/");
    } else {
      localStorage.removeItem("orderSuccess"); // clear after access
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <div className="bg-green-100 p-6 rounded-lg shadow w-full max-w-md">
        <h2 className="text-2xl font-bold text-green-700 mb-4">
          🎉 Order Confirmed!
        </h2>
        <p className="text-gray-700 mb-6">
          Your order was placed successfully. A confirmation email will be sent
          to you shortly.
        </p>
        <Link
          to="/orders"
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          View My Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
