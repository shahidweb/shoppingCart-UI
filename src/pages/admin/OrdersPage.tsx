import React, { useEffect, useState } from "react";

import SearchInput from "../../components/SearchInput";
import api from "../../services/api";
import { URLEndPoint } from "../../shared/auth-modal";
import {
  ellipseText,
  formatCurrency,
  formatDateTime,
  getPaymentColor,
  getStatusColor,
} from "../../shared/common-methods";
import { EyeIcon } from "@heroicons/react/24/solid";
import OrderDetailsModal from "../../components/admin/OrderDetailsModal";
import type { OrderItem } from "../../shared/interfaces";
import { toast } from "react-toastify";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const tableHeaders = [
    "Order ID",
    "Order Date",
    "User",
    "Address",
    "Total",
    "Payment",
    "Status",
    "Actions",
  ];
  const orderStatus = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];
  const paymentStatus = ["Pending", "Paid", "Failed", "Refunded"];

  const fetchOrders = async () => {
    const res = await api.get(URLEndPoint.adminOrder);
    setOrders(res.data);
  };

  const filteredOrders = orders.filter((item: any) =>
    item["email"].toLowerCase().includes(search.toLowerCase())
  );
  const updateStatus = async (orderId: number, newStatus: string) => {
    await api.put(`${URLEndPoint.adminOrder}/${orderId}`, {
      status: newStatus,
    });
    fetchOrders();
  };
  const updatePaymentStatus = async (orderId: number, newStatus: string) => {
    await api.put(
      `${URLEndPoint.adminOrder}/${orderId}${URLEndPoint.paymentStatus}`,
      {
        payment: newStatus,
      }
    );
    fetchOrders();
  };

  const handleViewClick = async (orderId: number) => {
    try {
      const res = await api.get(
        `${URLEndPoint.adminOrder}/${orderId}${URLEndPoint.items}`
      );
      setOrderItems(res.data);
      setSelectedOrderId(orderId);
      setShowModal(true);
    } catch (error: any) {
      console.log(error);
      toast.error(error.message || "ERR_BAD_REQUEST");
    }
  };
  const handleViewClose = () => {
    setOrderItems([]);
    setSelectedOrderId(null);
    setShowModal(false);
  };

  useEffect(() => {
    if (!orders.length) {
      fetchOrders();
    }
  }, []);

  return (
    <React.Fragment>
      <section className="relative bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
        <h1 className="mx-auto max-w-screen-xl px-4 lg:px-12 text-2xl font-bold p-4">
          Admin Order Management
        </h1>
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <SearchInput setSearch={setSearch} />
            </div>
            <div
              className="overflow-x-auto"
              style={{ height: "calc(100vh - 320px)" }}
            >
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:text-gray-400">
                  <tr>
                    {tableHeaders.map((header) => (
                      <th
                        key={header}
                        scope="col"
                        className={`px-4 py-4 ${
                          header === "Actions" ? "text-end block me-4" : ""
                        } ${header === "Payment" ? "text-center" : ""} ${
                          header === "Status" ? "text-center" : ""
                        } ${header === "Total" ? "text-end" : ""}`}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((item: any) => (
                      <tr key={item.id} className="border-b border-gray-300">
                        <td className="px-4 py-3">{item?.id}</td>
                        <td className="px-4 py-3">
                          {formatDateTime(item.created_at)}
                        </td>
                        <td className="px-4 py-3">{item?.email}</td>
                        <td className="px-4 py-3" title={item?.address}>
                          {ellipseText(item?.address)}
                        </td>
                        <td className="px-4 py-3 w-2 text-right">
                          {formatCurrency(item?.total_amount)}
                        </td>
                        <td
                          className={`px-4 py-3 text-center ${getPaymentColor(
                            item.payment
                          )}`}
                        >
                          <select
                            value={item.payment}
                            onChange={(e) =>
                              updatePaymentStatus(item.id, e.target.value)
                            }
                            disabled={["Delivered", "Cancelled"].includes(
                              item.status
                            )}
                            className={`border rounded px-2 py-1 text-sm ${
                              ["Delivered", "Cancelled"].includes(item.status)
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : getPaymentColor(item.payment)
                            }`}
                          >
                            {paymentStatus.map((payment) => (
                              <option
                                key={payment}
                                className={`cursor-pointer ${getPaymentColor(
                                  payment
                                )}`}
                                value={payment}
                              >
                                {payment}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className={`px-4 py-3 text-center`}>
                          <select
                            value={item.status}
                            onChange={(e) =>
                              updateStatus(item.id, e.target.value)
                            }
                            disabled={["Delivered", "Cancelled"].includes(
                              item.status
                            )}
                            className={`cursor-pointer border rounded px-2 py-1 text-sm ${
                              ["Delivered", "Cancelled"].includes(item.status)
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : getStatusColor(item.status)
                            }`}
                          >
                            {orderStatus.map((order) => (
                              <option
                                key={order}
                                className={`cursor-pointer ${getStatusColor(
                                  order
                                )}`}
                                value={order}
                              >
                                {order}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <button
                            onClick={() => handleViewClick(item.id)}
                            className="flex justify-between items-center text-blue-700 hover:bg-blue-700 hover:text-white border py-2 px-3 rounded-lg ml-2 cursor-pointer"
                          >
                            <EyeIcon className="h-4 w-4 inline" />
                            <span className="ps-1">View</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-4 py-3 text-center">
                        No products found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="p-4">
              <p className="text-gray-500">
                Total Orders: {filteredOrders.length}
              </p>
            </div>
          </div>
        </div>
        <OrderDetailsModal
          open={showModal}
          onClose={() => handleViewClose()}
          items={orderItems}
          orderId={selectedOrderId || 0}
        />
      </section>
    </React.Fragment>
  );
}
