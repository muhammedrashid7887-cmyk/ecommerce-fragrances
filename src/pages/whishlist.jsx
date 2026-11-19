
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../redux/Slices/cartSlice";
import { removetofav } from "../redux/Slices/wishlistSlice";
import { Trash2 } from "lucide-react";

function Wishlist() {
  const dispatch = useDispatch();

  // CURRENT LOGIN USER
  const user = useSelector((state) => state.auth.user);

  // GET CURRENT USER WISHLIST
  const favorites = useSelector(
    (state) => state.fav.data[user?.id] || []
  );

  // GET CART PRODUCTS
  const cartItems = useSelector(
    (state) => state.cart.items
  );

  // MOVE PRODUCT TO CART
  const moveToCart = (product) => {
    if (!user) return;

    if (Number(product.stock) <= 0) return;

    const exists = cartItems.find(
      (item) => item.id == product.id
    );

    if (!exists) {
      dispatch(addToCart(product));
    }

    dispatch(
      removetofav({
        userId: user.id,
        productId: product.id,
      })
    );
  };

  // REMOVE FROM WISHLIST
  const trash = (product) => {
    if (!user) return;

    dispatch(
      removetofav({
        userId: user.id,
        productId: product.id,
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3] px-5 py-12 text-[#30251F] md:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}
        <div className="mb-9 flex flex-wrap items-end justify-between gap-4 border-b border-[#D8D0C4] pb-6">
          <div>
            <p className="mb-2 text-[10px] uppercase tracking-[2px] text-[#806B57]">
              SAVED SELECTION
            </p>

            <h1 className="font-serif text-4xl font-normal md:text-5xl">
              Wishlist

              {favorites.length > 0 && (
                <sup className="ml-2 text-xs text-[#806B57]">
                  {favorites.length}
                </sup>
              )}
            </h1>
          </div>

          <p className="text-xs text-[#806B57]">
            Fragrances you've saved to revisit or move to your bag.
          </p>
        </div>

        {/* EMPTY WISHLIST */}
        {favorites.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center border border-[#D8D0C4] bg-[#FFFEFC] px-5 py-12 text-center">

            <h2 className="font-serif text-3xl font-normal text-[#30251F] md:text-4xl">
              Your wishlist is empty.
            </h2>

            <p className="mt-4 text-xs text-[#806B57] md:text-sm">
              Tap the heart on any fragrance to save it here.
            </p>

            <Link
              to="/products"
              className="mt-7 inline-flex items-center justify-center gap-5 bg-[#30251F] px-6 py-4 text-[10px] font-medium uppercase tracking-wider text-white transition hover:bg-[#49382F]"
            >
              EXPLORE FRAGRANCES
              <span className="text-base">→</span>
            </Link>
          </div>
        ) : (
          /* WISHLIST PRODUCTS */
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">

            {favorites.map((product) => {
              const stock = Number(product.stock);

              const alreadyInCart = cartItems.some(
                (item) => String(item.id) === String(product.id)
              );

              const outOfStock = !(stock > 0);

              return (
                <div
                  key={product.id}
                  className="flex flex-col border border-[#D8D0C4] bg-[#FFFEFC]"
                >

                  {/* PRODUCT IMAGE */}
                  <Link to={`/products/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="aspect-[0.85/1] w-full object-cover"
                    />
                  </Link>

                  {/* PRODUCT DETAILS */}
                  <div className="flex flex-1 flex-col p-4">

                    <div className="flex items-start justify-between gap-2">

                      <Link to={`/products/${product.id}`}>
                        <h3 className="font-serif text-lg text-[#30251F] hover:underline">
                          {product.name}
                        </h3>
                      </Link>

                      <span className="shrink-0 text-xs text-[#30251F]">
                        ₹{Number(product.price).toLocaleString("en-IN")}
                      </span>

                    </div>

                    <p className="mt-1 text-[10px] text-[#806B57]">
                      {product.subtitle}
                    </p>

                    {/* BUTTONS */}
                    <div className="mt-auto flex gap-2 pt-5">

                      {/* MOVE TO CART */}
                      <button
                        type="button"
                        onClick={() => moveToCart(product)}
                        disabled={outOfStock}
                        className="flex-1 bg-[#30251F] px-2 py-3 text-[10px] font-medium uppercase tracking-wider text-white transition hover:bg-[#49382F] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {outOfStock
                          ? "OUT OF STOCK"
                          : "MOVE TO CART"}
                      </button>

                      {/* REMOVE PRODUCT */}
                      <button
                        type="button"
                        onClick={() => trash(product)}
                        className="flex items-center justify-center border border-[#D8D0C4] px-3 text-[#806B57] transition hover:border-red-400 hover:text-red-500"
                        aria-label={`Remove ${product.name} from wishlist`}
                      >
                        <Trash2 size={15} />
                      </button>

                    </div>

                  </div>
                </div>
              );
            })}

          </div>
        )}

      </div>
    </div>
  );
}

export default Wishlist;
