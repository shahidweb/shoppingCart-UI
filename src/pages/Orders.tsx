import { toast } from "react-toastify";
import api from "../services/api";
import { useEffect, useState } from "react";
import { useAuthRedirect } from "../hooks/useAuthRedirect";

interface Order {
  id: number;
  total_amount: number;
  created_at: string;
}

const Orders = () => {
  useAuthRedirect();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await api.get("/orders");
      setOrders(res.data);
      localStorage.removeItem("orderSuccess");
    };
    fetchOrders();
  }, []);

  const downloadInvoice = async (orderId: number) => {
  try {
    const res = await api.get(`/orders/${orderId}/invoice`, {
      responseType: "blob", // Get binary data
    });

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


  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      {orders.map((order) => (
        <div key={order.id} className="bg-white p-4 rounded shadow mb-4">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Order #{order.id}</span>
            <span>{new Date(order.created_at).toLocaleString()}</span>
          </div>
          <div className="mt-2 font-semibold">Total: ₹{order.total_amount}</div>
          <button
            className="mt-3 text-sm bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded"
            onClick={() => downloadInvoice(order.id)}
          >
            Download Invoice
          </button>
        </div>
      ))}
    </div>
  );
};

export default Orders;
