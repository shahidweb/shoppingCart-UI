import {
  ChevronDownIcon,
  ChevronUpIcon,
  HeartIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import { use, useEffect, useState } from "react";
import api from "../services/api";
import { URLEndPoint } from "../shared/routeNames";
import { useParams } from "react-router-dom";
import type { Product } from "./home";
import QuantityControls from "../components/QuantityControls";

// const images = [
//   "/images/bag1.png",
//   "/images/bag2.png",
//   "/images/bag3.png",
//   "/images/bag4.png",
// ];

const ProductDetails = () => {
  const [selectedImg, setSelectedImg] = useState();
  const [images, setImages] = useState([]);
  const [selectedColor, setSelectedColor] = useState("gray");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [product, setProduct] = useState<Product>();
  const params = useParams<{ id: string }>();

  const toggleSection = (section: string) => {
    setExpanded((prev) => (prev === section ? null : section));
  };

  useEffect(() => {
    api
      .get(URLEndPoint.products + "/" + params.id)
      .then((res) => {
        setProduct(res.data);
        setSelectedImg(res.data.image || images[0]);
        const imageArray = res.data.images || [];
        setImages(imageArray.length > 0 ? imageArray : [res.data.image]);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Left: Product Images */}
      <div>
        <img
          src={selectedImg}
          alt="Main"
          className="w-full rounded-lg border shadow-sm"
        />

        <div className="flex gap-3 mt-4">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`thumb-${index}`}
              onClick={() => setSelectedImg(img)}
              className={`w-20 h-20 rounded border cursor-pointer object-cover ${
                selectedImg === img ? "ring-2 ring-indigo-500" : ""
              }`}
            />
          ))}
        </div>
      </div>

      {/* Right: Product Info */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{product?.name}</h2>
        <p className="text-xl font-semibold text-gray-700 mt-2">
          ${product?.price}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          {[...Array(4)].map((_, i) => (
            <StarIcon
              key={i}
              className="w-5 h-5 text-yellow-500 cursor-pointer"
            />
          ))}
          <StarIcon className="w-5 h-5 text-gray-300 cursor-pointer" />
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mt-4 leading-relaxed">
          {product?.description}
        </p>

        {/* Color Options */}
        <div className="mt-6">
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Color
          </label>
          <div className="flex gap-3">
            {["#1F2937", "#FFFFFF", "#6B7280"].map((color, i) => (
              <div
                key={i}
                className={`w-7 h-7 rounded-full border-2 cursor-pointer ${
                  selectedColor === color ? "ring-2 ring-indigo-500" : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              ></div>
            ))}
          </div>
        </div>

        {/* Add to Cart */}
        <QuantityControls productId={product?.id ?? 0} />

        {/* Collapsible Sections */}
        <div className="mt-8 space-y-2">
          {["Features", "Care", "Shipping", "Returns"].map((section) => (
            <div key={section} className="border-b pb-2">
              <button
                onClick={() => toggleSection(section)}
                className="flex justify-between items-center w-full cursor-pointer text-sm font-medium text-gray-700"
              >
                {section}
                {expanded === section ? (
                  <ChevronUpIcon className="w-4 h-4" />
                ) : (
                  <ChevronDownIcon className="w-4 h-4" />
                )}
              </button>
              {expanded === section && (
                <p className="text-xs text-gray-500 mt-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Blanditiis pariatur molestias deserunt!
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
