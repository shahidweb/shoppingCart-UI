import React, { useEffect, useState } from "react";

import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import AddProductModal from "../../components/admin/AddProductModal";
import ConfirmationModal from "../../components/admin/ConfirmationModal";
import SearchInput from "../../components/SearchInput";
import { deleteProduct, setProducts } from "../../redux/slices/productSlice";
import type { RootState } from "../../redux/store";
import api from "../../services/api"; // Adjust the import based on your API setup
import { URLEndPoint } from "../../shared/auth-modal";
import type { IProduct } from "../../shared/interfaces";
import { NotificationMsg } from "../../shared/notification-modal";
import { toast } from "react-toastify";
import { formatCurrency } from "../../shared/common-methods";

export default function ProductPage() {
  const products = useSelector((state: RootState) => state.products.items);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const dispatch = useDispatch();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const tableHeaders = [
    "Image",
    "Product Name",
    "Description",
    "Price",
    "Actions",
  ];

  const fetchProducts = async () => {
    const res = await api.get(URLEndPoint.adminProduct);
    dispatch(setProducts(res.data));
  };

  const filteredProducts = products.filter((product: IProduct) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const dtlProduct = async (id: number) => {
    await api.delete(`${URLEndPoint.adminProduct}/${id}`);
    toast.success(NotificationMsg.productDeleted);
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (!products.length) {
      fetchProducts();
    }
  }, []);

  return (
    <React.Fragment>
      <section className="relative bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
        <h1 className="mx-auto max-w-screen-xl px-4 lg:px-12 text-2xl font-bold p-4">
          Admin Product Management
        </h1>
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <SearchInput setSearch={setSearch} />
              <div className="flex flex-col justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(true);
                    setSelectedProduct(null);
                  }}
                  className="flex items-center justify-center text-white bg-blue-900 hover:bg-blue-700 cursor-pointer font-medium rounded-lg text-sm px-4 py-2"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add product
                </button>
              </div>
            </div>
            <div
              className="overflow-x-auto"
              style={{ minHeight: "calc(100vh - 320px)" }}
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
                        }`}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <tr key={product.id} className="border-b border-gray-300">
                        <td>
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-16 h-16 p-2 object-cover rounded"
                          />
                        </td>
                        <th
                          scope="row"
                          className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {product.name}
                        </th>
                        <td className="px-4 py-3 max-w-[12rem] truncate">
                          {product.description}
                        </td>
                        <td className="px-4 py-3">{formatCurrency(product.price)}</td>
                        <td>
                          <div className="flex justify-end items-center me-5">
                            <button
                              onClick={() => {
                                setIsModalOpen(true);
                                setSelectedProduct(product);
                              }}
                              className="flex justify-between items-center bg-blue-900 hover:bg-blue-700 text-white border py-2 px-3 rounded-lg ml-2 cursor-pointer"
                            >
                              <PencilIcon className="h-4 w-4 inline" />
                              <span className="ps-1">Edit</span>
                            </button>
                            <button
                              onClick={() => {
                                setIsConfirmationOpen(true);
                                setSelectedProduct(product);
                              }}
                              className="flex justify-between items-center text-red-700 hover:bg-red-700 hover:text-white border py-2 px-3 rounded-lg ml-2 cursor-pointer"
                            >
                              <TrashIcon className="h-4 w-4 inline" />
                              <span className="ps-1">Delete</span>
                            </button>
                          </div>
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
                Total Products: {filteredProducts.length}
              </p>
            </div>
          </div>
        </div>
        <AddProductModal
          product={selectedProduct ?? undefined}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
        <ConfirmationModal
          isOpen={isConfirmationOpen}
          onClose={() => setIsConfirmationOpen(false)}
          onConfirm={() => {
            if (selectedProduct) {
              dtlProduct(selectedProduct.id);
            }
          }}
        />
      </section>
    </React.Fragment>
  );
}
