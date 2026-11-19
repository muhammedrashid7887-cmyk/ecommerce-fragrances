
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/Slices/cartSlice";
import { addtofav, removetofav } from "../redux/Slices/wishlistSlice";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const stock = Number(product.stock);

  // CURRENT LOGIN USER
  const user = useSelector((state) => state.auth.user);

  // CHECK CURRENT USER WISHLIST
  const favProduct = useSelector((state) =>
    (state.fav.data[user?.id] || []).find(
      (pro) => pro.id === product.id
    )
  );

  // CHECK CART
  const cartProduct = useSelector((state) =>
    state.cart.items.find((item) => item.id === product.id)
  );

  const added = Boolean(cartProduct);

  // WISHLIST ADD / REMOVE
  
  const handleFav = () => {
    if (!user) return;

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

  // ADD TO CART
  const addbtn = () => {
    if (stock > 0 && !added) {
      dispatch(addToCart(product));
    }
  };

  return (
    <div className="group w-full min-w-0">

      {/* PRODUCT IMAGE */}
      <div className="relative aspect-[0.85/1] w-full overflow-hidden border border-[#D8D0C4] bg-[#f1eee9]">

        <Link to={`/products/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* CATEGORY */}
        <span className="absolute left-3 top-3 bg-[#faf9f6] px-2 py-1 text-[9px] uppercase tracking-widest text-[#7b746c]">
          {product.category}
        </span>

        {/* WISHLIST */}
        <button
          type="button"
          className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-[#756f69] transition hover:text-red-500"
          aria-label={
            favProduct
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
          onClick={handleFav}
        >
          <span className="text-black">
            {favProduct ? "♥" : "♡"}
          </span>
        </button>

        {/* STOCK BADGE */}
        {stock <= 0 && (
          <span className="absolute bottom-3 left-3 bg-black px-2 py-1 text-[9px] uppercase tracking-wider text-white">
            OUT OF STOCK
          </span>
        )}

      </div>

      {/* PRODUCT DETAILS */}
      <div className="pt-3">

        <div className="flex flex-wrap items-start justify-between gap-x-2 gap-y-1">

          {/* NAME */}
          <Link to={`/products/${product.id}`}>
            <h3 className="font-serif text-base font-light text-[#8a6458] hover:underline">
              {product.name}
            </h3>
          </Link>

          {/* PRICE */}
          <span className="shrink-0 text-[11px] text-[#554f49]">
            ₹{Number(product.price).toLocaleString("en-IN")}
          </span>

        </div>

        {/* DESCRIPTION */}
        <p className="mt-1 text-[10px] text-[#a49a90]">
          {product.description}
        </p>

        {/* ADD TO BAG */}
        <button
          type="button"
          onClick={addbtn}
          disabled={!(stock > 0)}
          className="mt-3 flex w-full items-center justify-between border-y border-[#d8d0c5] py-3 text-[10px] uppercase tracking-widest text-[#625a52] transition hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span>
            {!(stock > 0)
              ? "OUT OF STOCK"
              : added
              ? "ADDED TO BAG"
              : "ADD TO BAG"}
          </span>

          <span>{added ? "✓" : "→"}</span>
        </button>

      </div>
    </div>
  );
}

export default ProductCard;
