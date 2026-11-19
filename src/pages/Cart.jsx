
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { minus, plus, trash } from "../redux/Slices/cartSlice";

function Cart() {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const subTotal = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#30251F]">

      {cartItems.length === 0 ? (

        // EMPTY CART
        <div className="min-h-[65vh] flex flex-col items-center justify-center text-center px-5">

          <p className="text-[11px] tracking-[3px] text-[#806B57] mb-5">
            YOUR SELECTION
          </p>

          <h1 className="font-serif text-4xl md:text-5xl mb-6">
            Your bag is waiting.
          </h1>

          <p className="text-[#9B8066] text-sm md:text-base mb-9">
            Discover a fragrance that feels entirely your own.
          </p>

          <Link
            to="/products"
            className="flex items-center gap-6 bg-[#30251F] text-white px-7 py-5 text-xs tracking-wider hover:bg-[#4B382E] transition"
          >
            EXPLORE FRAGRANCES
            <ArrowRight size={17} />
          </Link>

        </div>

      ) : (

        // CART WITH PRODUCTS
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-16">

          {/* HEADING */}
          <div className="border-b border-[#D8D0C4] pb-9 mb-12">

            <p className="text-[11px] tracking-[3px] text-[#806B57] mb-2">
              YOUR SELECTION
            </p>

            <h1 className="font-serif text-4xl md:text-5xl">
              Shopping bag
              <sup className="text-sm ml-3">
                {cartItems.length}
              </sup>
            </h1>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* LEFT SIDE — CART PRODUCTS */}
            <div className="lg:col-span-2">

              {cartItems.map((item) => (

                <div
                  key={item.id}
                  className="border-t border-[#D8D0C4] py-7 flex flex-col sm:flex-row sm:items-center gap-5"
                >

                  {/* PRODUCT IMAGE */}
                  <Link to={`/products/${item.id}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-28 h-36 object-cover bg-[#EEE8DF]"
                    />
                  </Link>

                  {/* PRODUCT DETAILS */}
                  <div className="flex-1">

                    <p className="text-[10px] tracking-[2px] text-[#9B8066] mb-2">
                      EAU DE PARFUM
                    </p>

                    <h2 className="font-serif text-2xl mb-1">
                      {item.name}
                    </h2>

                    <p className="text-sm text-[#9B8066]">
                      {item.subtitle}
                    </p>

                  </div>

                  {/* QUANTITY */}
                  <div className="flex items-center border border-[#D8D0C4]">

                    <button
                      type="button"
                      aria-label={`Decrease quantity of ${item.name}`}
                      className="px-3 py-3 hover:bg-[#EEE8DF]"
                      onClick={() => dispatch(minus(item.id))}
                    >
                      <Minus size={15} />
                    </button>

                    <span className="px-2 text-sm">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      aria-label={`Increase quantity of ${item.name}`}
                      className="px-3 py-3 hover:bg-[#EEE8DF]"
                      onClick={() => dispatch(plus(item.id))}
                    >
                      <Plus size={15} />
                    </button>

                  </div>

                  {/* PRICE */}
                  <p className="font-medium text-sm sm:w-24 sm:text-right">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </p>

                  {/* REMOVE */}
                  <button
                    type="button"
                    aria-label={`Remove ${item.name} from cart`}
                    className="text-[#9B8066] hover:text-red-600 transition"
                    onClick={() => dispatch(trash(item.id))}
                  >
                    <Trash2 size={17} />
                  </button>

                </div>

              ))}

            </div>

            {/* RIGHT SIDE — ORDER SUMMARY */}
            <div className="border border-[#D8D0C4] border-t-2 border-t-[#30251F] p-7 h-fit bg-[#FFFEFC]">

              <h2 className="font-serif text-3xl mb-8">
                Order summary
              </h2>

              <div className="flex justify-between text-sm text-[#806B57] mb-5">
                <span>Subtotal</span>
                <span>₹{subTotal.toLocaleString("en-IN")}</span>
              </div>

              <div className="flex justify-between text-sm text-[#806B57] mb-7">
                <span>Delivery</span>
                <span>Complimentary</span>
              </div>

              <div className="border-t border-[#D8D0C4] pt-6 flex justify-between text-base font-medium">
                <span>Total</span>
                <span>₹{subTotal.toLocaleString("en-IN")}</span>
              </div>

              <button
                type="button"
                className="w-full flex justify-between items-center bg-[#30251F] text-white px-6 py-5 mt-8 text-xs tracking-wider hover:bg-[#4B382E] transition"
                onClick={() => nav("/checkOut")}
              >
                PROCEED TO CHECKOUT
                <ArrowRight size={18} />
              </button>

              <p className="text-center text-xs text-[#9B8066] mt-5">
                Complimentary delivery on orders over 2899
              </p>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Cart;
