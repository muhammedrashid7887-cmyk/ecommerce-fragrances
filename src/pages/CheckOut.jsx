
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearCart } from "../redux/Slices/cartSlice";
import { createOrder } from "../services/orderService";

function Checkout() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const nav = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);

  const user = useSelector((state) => state.auth.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  const submittingRef = useRef(false);

  const subTotal = cartItems.reduce((total, item) => {
    return total + Number(item.price) * item.quantity;
  }, 0);

  // TANSTACK QUERY MUTATION
  const { mutate, isPending, isError } = useMutation({
    mutationFn: createOrder,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });

      dispatch(clearCart());

      nav("/order-success", { replace: true });
    },

    onError: (error) => {
      submittingRef.current = false;
      console.error("Order failed:", error);
    },
  });

  // SUBMIT ORDER
  const handleSubmit = (e) => {
    e.preventDefault();

    if (submittingRef.current || isPending || cartItems.length === 0) {
      return;
    }

    if (
      !name.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !address.trim() ||
      !city.trim() ||
      !pincode.trim()
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    submittingRef.current = true;

    const orderData = {
      id: Date.now().toString(),
      userId: user?.id,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      address: address.trim(),
      city: city.trim(),
      pincode: pincode.trim(),
      country: "India",
      payment: "COD",
      products: cartItems,
      total: subTotal,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    mutate(orderData);
  };

  const inputStyle =
    "w-full border border-[#D8D0C4] bg-[#FFFEFC] px-3 py-3 text-sm text-[#30251F] outline-none focus:border-[#30251F]";

  const labelStyle =
    "block text-[10px] tracking-[1px] text-[#806B57] mb-2 uppercase";

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#30251F] px-5 md:px-10 py-12">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="border-b border-[#D8D0C4] pb-6 mb-8">
          <p className="text-[10px] tracking-[3px] text-[#9B8066] mb-2">
            SECURE CHECKOUT
          </p>

          <h1 className="font-serif text-3xl md:text-4xl">
            Complete your order
          </h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="font-serif text-3xl mb-4">
              Your bag is empty.
            </h2>

            <Link
              to="/products"
              className="inline-block bg-[#30251F] text-white px-6 py-4 text-xs"
            >
              EXPLORE FRAGRANCES
            </Link>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12 items-start"
          >

            {/* LEFT SIDE */}
            <div className="lg:col-span-3">

              {/* CONTACT */}
              <div className="mb-10">
                <h2 className="font-serif text-xl mb-4">
                  Contact
                </h2>

                <div className="border-t border-[#D8D0C4] pt-4">

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">

                    <div>
                      <label htmlFor="checkout-name" className={labelStyle}>
                        Full Name *
                      </label>

                      <input
                        id="checkout-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
                        required
                        className={inputStyle}
                      />
                    </div>

                    <div>
                      <label htmlFor="checkout-email" className={labelStyle}>
                        Email Address *
                      </label>

                      <input
                        id="checkout-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@gmail.com"
                        required
                        className={inputStyle}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="checkout-phone" className={labelStyle}>
                      Phone Number *
                    </label>

                    <input
                      id="checkout-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="9876543210"
                      pattern="[0-9]{10}"
                      maxLength={10}
                      required
                      className={inputStyle}
                    />
                  </div>

                </div>
              </div>

              {/* DELIVERY ADDRESS */}
              <div className="mb-10">
                <h2 className="font-serif text-xl mb-4">
                  Delivery address
                </h2>

                <div className="border-t border-[#D8D0C4] pt-4">

                  <div className="mb-4">
                    <label htmlFor="checkout-address" className={labelStyle}>
                      Street Address *
                    </label>

                    <input
                      id="checkout-address"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="House name, street, area"
                      required
                      className={inputStyle}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                    <div>
                      <label htmlFor="checkout-city" className={labelStyle}>
                        City *
                      </label>

                      <input
                        id="checkout-city"
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="City"
                        required
                        className={inputStyle}
                      />
                    </div>

                    <div>
                      <label htmlFor="checkout-pincode" className={labelStyle}>
                        PIN Code *
                      </label>

                      <input
                        id="checkout-pincode"
                        type="text"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="6-digit PIN"
                        pattern="[0-9]{6}"
                        maxLength={6}
                        required
                        className={inputStyle}
                      />
                    </div>

                    <div>
                      <label htmlFor="checkout-country" className={labelStyle}>
                        Country *
                      </label>

                      <select
                        id="checkout-country"
                        defaultValue="India"
                        className={inputStyle}
                      >
                        <option value="India">
                          India
                        </option>
                      </select>
                    </div>

                  </div>
                </div>
              </div>

              {/* PAYMENT */}
              <div>
                <h2 className="font-serif text-xl mb-4">
                  Payment
                </h2>

                <div className="border-t border-[#D8D0C4] pt-4">
                  <div className="flex items-center justify-between border border-[#30251F] bg-[#FFFEFC] p-5">

                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        checked
                        readOnly
                        aria-label="Cash on Delivery"
                        className="accent-[#30251F]"
                      />

                      <div>
                        <p className="text-sm">
                          Cash on Delivery
                        </p>

                        <p className="text-xs text-[#9B8066] mt-1">
                          Pay with cash when your order arrives
                        </p>
                      </div>
                    </div>

                    <span className="text-[10px] tracking-wider text-[#9B8066]">
                      COD
                    </span>

                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT SIDE - ORDER SUMMARY */}
            <div className="lg:col-span-2 border border-[#D8D0C4] border-t-2 border-t-[#30251F] bg-[#FFFEFC] p-6">

              <h2 className="font-serif text-2xl mb-6">
                Your order
              </h2>

              {/* PRODUCTS */}
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border-b border-[#D8D0C4] py-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-16 object-cover bg-[#EEE8DF]"
                  />

                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {item.name}
                    </p>

                    <p className="text-xs text-[#9B8066] mt-1">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="text-sm whitespace-nowrap">
                    ₹{(
                      Number(item.price) * item.quantity
                    ).toLocaleString("en-IN")}
                  </p>
                </div>
              ))}

              {/* SUBTOTAL */}
              <div className="flex justify-between text-sm text-[#806B57] mt-6 mb-4">
                <span>Subtotal</span>
                <span>
                  ₹{subTotal.toLocaleString("en-IN")}
                </span>
              </div>

              {/* DELIVERY */}
              <div className="flex justify-between text-sm text-[#806B57] mb-5">
                <span>Delivery</span>
                <span>Complimentary</span>
              </div>

              {/* TOTAL */}
              <div className="border-t border-[#D8D0C4] pt-5 flex justify-between text-base font-medium">
                <span>Total</span>
                <span>
                  ₹{subTotal.toLocaleString("en-IN")}
                </span>
              </div>

              {/* CONFIRM BUTTON */}
              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-[#30251F] text-white py-4 mt-6 text-xs tracking-wider hover:bg-[#4B382E] transition disabled:opacity-50"
              >
                {isPending
                  ? "PLACING ORDER..."
                  : "CONFIRM ORDER (COD)"}
              </button>

              {isError && (
                <p className="text-red-500 text-xs mt-3">
                  Order failed. Please try again.
                </p>
              )}

              <p className="text-xs text-[#9B8066] text-center mt-4">
                Secure checkout · Cash on Delivery
              </p>

            </div>
          </form>
        )}

      </div>
    </div>
  );
}

export default Checkout;
