import { toast } from "react-toastify";
import api from "../services/api";
import { useEffect, useState } from "react";
import { useAuthRedirect } from "../hooks/useAuthRedirect";
import { formatCurrency } from "../shared/common-methods";
import { URLEndPoint } from "../shared/auth-modal";
import { Link } from "react-router-dom";
import EmptyPage from "../components/EmptyPage";

interface Order {
  id: number;
  total_amount: number;
  created_at: string;
  delivered_at: string | null;
  items: {
    product_id: number;
    name: string;
    price: number;
    image: string;
  }[];
}

const OrderHistory = () => {
  useAuthRedirect();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await api.get(URLEndPoint.orders);
      setOrders(res.data);
      localStorage.removeItem("orderSuccess");
    };
    fetchOrders();
  }, []);

  const downloadInvoice = async (orderId: number) => {
    try {
      const res = await api.get(
        `${URLEndPoint.orders}/${orderId}${URLEndPoint.invoice}`,
        {
          responseType: "blob", // Get binary data
        }
      );

      // Create a download link
      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `invoice-${orderId}.pdf`; // Filename
      link.click();

      window.URL.revokeObjectURL(url); // Clean up
      toast.success("Invoice downloaded!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to download invoice");
    }
  };

  if (orders.length === 0) {
    return <EmptyPage text="Your Orders are Empty" />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold">Order history</h1>
      <p className="text-gray-500 mb-6">
        Check the status of recent orders, manage returns, and download
        invoices.
      </p>

      {orders &&
        orders.map((order, i) => (
          <div key={i} className="bg-white mb-8">
            {/* Order Summary Header */}
            <div className="p-4 sm:p-6 bg-gray-100 flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <div className="flex flex-col sm:flex-row sm:gap-12 text-sm">
                <div>
                  <p className="text-gray-500">Date placed</p>
                  <p className="font-medium">
                    {new Date(order.created_at).toDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Order number</p>
                  <p className="font-medium">{order.id}</p>
                </div>
                <div>
                  <p className="text-gray-500">Total amount</p>
                  <p className="font-medium">
                    {formatCurrency(order.total_amount)}
                  </p>
                </div>
              </div>
              <div className="mt-4 sm:mt-0">
                <button
                  className="px-4 py-1.5 border rounded hover:bg-gray-50 text-sm cursor-pointer"
                  onClick={() => downloadInvoice(order.id)}
                >
                  View Invoice
                </button>
              </div>
            </div>

            {/* Table Layout */}
            <div className="divide-y text-sm">
              <div className="grid grid-cols-4 text-left px-6 py-2 text-gray-500 font-medium border-b border-gray-200 hover:bg-gray-50">
                <div>Product</div>
                <div>Price</div>
                <div>Status</div>
                <div>Info</div>
              </div>

              {order &&
                order.items &&
                order.items.map((item, j) => (
                  <div
                    key={j}
                    className="grid grid-cols-4 items-center px-6 py-4 text-sm border-b border-gray-200 hover:bg-gray-50"
                  >
                    {/* Product */}
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded border border-b-gray-100 object-cover"
                      />
                      <span className="font-medium text-gray-800">
                        {item.name}
                      </span>
                    </div>

                    {/* Price */}
                    <div>{formatCurrency(item.price)}</div>

                    {/* Status */}
                    <div className="text-gray-700">
                      Delivered{" "}
                      {new Date(
                        order.delivered_at || order.created_at
                      ).toDateString()}
                    </div>

                    {/* Info */}
                    <div className="text-indigo-600 font-medium hover:underline cursor-pointer">
                      <a href={`/product/${item.product_id}`}>View Product</a>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default OrderHistory;
