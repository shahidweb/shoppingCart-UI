import { XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addProduct, updateProduct } from "../../redux/slices/productSlice";
import api from "../../services/api";
import { URLEndPoint } from "../../shared/auth-modal";
import type { IProduct } from "../../shared/interfaces";
import { toast } from "react-toastify";
import { NotificationMsg } from "../../shared/notification-modal";
import { tryCatch } from "../../utils/apiHandler";

interface CreateProductModalProps {
  product?: IProduct;
  isOpen: boolean;
  onClose: () => void;
}

const defaultProduct: IProduct = {
  id: 0,
  name: "",
  price: 0,
  image: "",
  description: "",
};

type ProductFormInputs = {
  name: string;
  price: number;
  image: string;
  description: string;
};

function AddProductModal(props: CreateProductModalProps) {
  const { product, isOpen, onClose } = props;
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormInputs>({
    defaultValues: defaultProduct,
  });

  const onSubmit = async (data: ProductFormInputs) => {
    if (product?.id) {
      const res = await tryCatch(() =>
        api.put(`${URLEndPoint.adminProduct}/${product.id}`, data)
      );
      if (res) dispatch(updateProduct({ ...data, id: product.id }));
    } else {
      const res = await tryCatch(() =>
        api.post(URLEndPoint.adminProduct, data)
      );
      if (res) dispatch(addProduct({ ...data, id: Date.now() })); // Assuming a new ID is generated
    }
    toast.success(
      product?.id
        ? NotificationMsg.productUpdated
        : NotificationMsg.productAdded
    );
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      if (product) {
        reset({
          name: product.name,
          price: product.price,
          image: product.image,
          description: product.description,
        });
      } else {
        reset({ ...defaultProduct });
      }
    }
  }, [isOpen, product]);

  return (
    <div
      id="createProductModal"
      tabIndex={-1}
      className={`${
        isOpen ? "flex" : "hidden"
      } bg-gray-900/50 fixed justify-center items-center md:inset-0`}
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {product?.id ? "Edit Product" : "Add Product"}
            </h3>
            <XMarkIcon
              className="w-5 h-5 text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer"
              onClick={onClose}
            />
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="gap-4 mb-4 sm:grid-cols-2">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name", { required: "Name is required" })}
                  className="bg-gray-50 border border-gray-200 outline-0 focus:border-blue-800 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  placeholder="Type product name"
                />
                {errors.name && (
                  <span className="text-red-500 text-xs">
                    {errors.name.message}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  {...register("price", {
                    required: "Price is required",
                    min: { value: 1, message: "Price must be at least 1" },
                  })}
                  className="bg-gray-50 border border-gray-200 outline-0 focus:border-blue-800 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  placeholder="2999"
                />
                {errors.price && (
                  <span className="text-red-500 text-xs">
                    {errors.price.message}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="imageUrl"
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Image Url
                </label>
                <input
                  type="text"
                  id="image"
                  {...register("image", { required: "Image is required" })}
                  className="bg-gray-50 border border-gray-200 outline-0 focus:border-blue-800 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  placeholder="https://example.com/image.jpg"
                />
                {errors.image && (
                  <span className="text-red-500 text-xs">
                    {errors.image.message}
                  </span>
                )}
              </div>
              <div className="sm:col-span-2 mb-4">
                <label
                  htmlFor="description"
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows={4}
                  {...register("description")}
                  className="bg-gray-50 border border-gray-200 outline-0 focus:border-blue-800 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  placeholder="Write product description here"
                ></textarea>
              </div>
            </div>
            <div className="text-end">
              <button
                type="submit"
                className="text-white bg-blue-900 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 cursor-pointer"
              >
                {product?.id ? "Update Product" : "Add New Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProductModal;
