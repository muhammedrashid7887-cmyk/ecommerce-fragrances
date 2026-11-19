
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";

import { getProductById } from "../services/productService";
import { addToCart, plus } from "../redux/Slices/cartSlice";
import {
  addtofav,
  removetofav,
} from "../redux/Slices/wishlistSlice";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [selectedQuantity, setSelectedQuantity] = useState(1);

  // CURRENT LOGIN USER
  const user = useSelector((state) => state.auth.user);

  // FETCH PRODUCT
  const {
    data: product,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
  });

  // CURRENT USER WISHLIST
  const favProduct = useSelector((state) =>
    (state.fav.data[user?.id] || []).find(
      (item) => String(item.id) === String(id)
    )
  );

  // CHECK PRODUCT IN CART
  const cartProduct = useSelector((state) =>
    state.cart.items.find(
      (item) => String(item.id) === String(id)
    )
  );

  const stock = Number(product?.stock) || 0;

  // TRUE IF ALREADY ADDED
  const isAdded = Boolean(cartProduct);

  // SELECTED QUANTITY
  const quantity = Math.min(
    selectedQuantity,
    Math.max(1, stock)
  );

  // WISHLIST ADD / REMOVE
  const handleFav = () => {
    if (!user || !product) return;

    if (favProduct) {
      dispatch(
        removetofav({
          userId: user.id,
          productId: product.id,
        })
      );
    } else {
      dispatch(
        addtofav({
          userId: user.id,
          product: product,
        })
      );
    }
  };

  // INCREASE QUANTITY
  const handlePlus = () => {
    if (!isAdded && quantity < stock) {
      setSelectedQuantity(quantity + 1);
    }
  };

  // DECREASE QUANTITY
  const handleMinus = () => {
    if (!isAdded && quantity > 1) {
      setSelectedQuantity(quantity - 1);
    }
  };

  // ADD TO CART ONLY ONCE
  const handleCart = () => {
    if (!product || isAdded || stock <= 0) return;

    // ADD PRODUCT FIRST
    dispatch(addToCart(product));

    // INCREASE QUANTITY IF SELECTED MORE THAN 1
    for (let i = 1; i < quantity; i++) {
      dispatch(plus(product.id));
    }
  };

  if (isPending) {
    return (
      <p className="py-20 text-center">
        Loading product...
      </p>
    );
  }

  if (isError || !product) {
    return (
      <p className="py-20 text-center text-red-500">
        Failed to load product.
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#30251F]">
      <div className="mx-auto max-w-6xl px-5 py-10">

        {/* BREADCRUMB */}
        <div className="mb-7 flex items-center gap-2 text-[10px] text-[#8A7462]">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/products">Fragrances</Link>
          <span>/</span>
          <span className="text-[#30251F]">
            {product.name}
          </span>
        </div>

        {/* MAIN SECTION */}
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2">

          {/* PRODUCT IMAGE */}
          <div className="overflow-hidden border border-[#DED6C9] bg-[#EEE8DF]">
            <img
              src={product.image}
              alt={product.name}
              className="aspect-[1.09/1] w-full object-cover"
            />
          </div>

          {/* PRODUCT DETAILS */}
          <div className="pt-5">

            {/* CATEGORY AND STOCK */}
            <div className="mb-3 flex items-center gap-4">
              <p className="text-[9px] uppercase tracking-[2px] text-[#806B57]">
                {product.category} · {product.subtitle}
              </p>

              <span className="border border-[#D8D0C4] px-2 py-1 text-[9px] text-[#806B57]">
                {stock > 0
                  ? `${stock} in stock`
                  : "Out of stock"}
              </span>
            </div>

            {/* NAME */}
            <h1 className="font-serif text-4xl md:text-5xl">
              {product.name}
            </h1>

            {/* PRICE */}
            <p className="mt-4 text-3xl">
              ₹{Number(product.price).toLocaleString("en-IN")}
            </p>

            {/* DESCRIPTION */}
            <p className="mt-6 text-sm leading-7 text-[#8A6458]">
              {product.description}
            </p>

            {/* NOTES */}
            <div className="mt-5 border-y border-[#D8D0C4] py-4">
              <p className="mb-2 text-[9px] uppercase tracking-widest text-[#9B8066]">
                NOTES
              </p>

              <p className="font-serif text-sm">
                {product.notes}
              </p>
            </div>

            {/* FRAGRANCE PROFILE */}
            <div className="mt-6">
              <p className="mb-3 text-[9px] uppercase tracking-widest text-[#9B8066]">
                FRAGRANCE PROFILE
              </p>

              <div className="grid grid-cols-3 gap-2">
                {[
                  {
                    label: "SCENT FAMILY",
                    value: product.category,
                  },
                  {
                    label: "BEST OCCASION",
                    value: product.occasion || "Daily Wear",
                  },
                  {
                    label: "LONGEVITY",
                    value: product.longevity || "6–8 Hours",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="border border-[#D8D0C4] bg-[#FFFEFC] py-3 text-center"
                  >
                    <p className="text-[9px] text-[#9B8066]">
                      {item.label}
                    </p>

                    <p className="mt-1 font-serif text-xs">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ACTIONS */}
            <div className="mt-5 flex gap-2">

              {/* QUANTITY */}
              <div className="flex items-center border border-[#D8D0C4]">

                {/* MINUS */}
                <button
                  type="button"
                  onClick={handleMinus}
                  disabled={
                    isAdded ||
                    quantity <= 1 ||
                    stock <= 0
                  }
                  aria-label="Decrease quantity"
                  className="px-3 text-[#806B57] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  −
                </button>

                {/* QUANTITY VALUE */}
                <span className="px-2 text-xs">
                  {stock > 0 ? quantity : 0}
                </span>

                {/* PLUS */}
                <button
                  type="button"
                  onClick={handlePlus}
                  disabled={
                    isAdded ||
                    quantity >= stock ||
                    stock <= 0
                  }
                  aria-label="Increase quantity"
                  className="px-3 text-[#806B57] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  +
                </button>
              </div>

              {/* ADD TO BAG */}
              <button
                type="button"
                onClick={handleCart}
                disabled={isAdded || stock <= 0}
                className="flex flex-1 items-center justify-between bg-[#30251F] px-5 py-3 text-[10px] font-medium uppercase tracking-wider text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span>
                  {stock <= 0
                    ? "OUT OF STOCK"
                    : isAdded
                      ? "ADDED TO CART"
                      : "ADD TO BAG"}
                </span>

                <span>
                  {isAdded ? "✓" : "→"}
                </span>
              </button>

              {/* WISHLIST */}
              <button
                type="button"
                onClick={handleFav}
                className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#D8D0C4] bg-[#FFFEFC] text-xl text-black"
                aria-label={
                  favProduct
                    ? "Remove from wishlist"
                    : "Add to wishlist"
                }
              >
                {favProduct ? "♥" : "♡"}
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
