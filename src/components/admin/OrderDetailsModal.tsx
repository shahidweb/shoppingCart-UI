import React from "react";
import type { OrderItem } from "../../shared/interfaces";
import { formatCurrency } from "../../shared/common-methods";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface Props {
  open: boolean;
  onClose: () => void;
  items: OrderItem[];
  orderId: number;
}

const OrderDetailsModal: React.FC<Props> = ({
  open,
  onClose,
  items,
  orderId,
}) => {
  if (!open) return null;
  console.log(items)

  return (
    <div className="bg-gray-900/50 flex fixed justify-center items-center md:inset-0">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 relative">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-semibold mb-4">
            Order #{orderId} Details
          </h2>
          <button onClick={onClose}>
            <XMarkIcon
              className="w-5 h-5 text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer"
              onClick={onClose}
            />
          </button>
        </div>

        <table className="w-full text-sm border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Product</th>
              <th className="p-2 border">Qty</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Total</th>
            </tr>
          </thead>
          <tbody>
            {items?.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-2 border">{item.name}</td>
                <td className="p-2 border">{item.quantity}</td>
                <td className="p-2 border">{formatCurrency(item.price)}</td>
                <td className="p-2 border">
                  {formatCurrency(item.quantity * item.price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-end mt-4">
          <button
            type="button"
            onClick={onClose}
            className="text-white bg-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
