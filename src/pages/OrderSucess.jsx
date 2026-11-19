
import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <div className="min-h-[75vh] bg-[#FAF8F3] flex items-start justify-center px-5 pt-24 md:pt-28">

      <div className="max-w-2xl w-full text-center">

        <p className="text-[11px] tracking-[3px] text-[#806B57] mb-4">
          ORDER CONFIRMED
        </p>

        <h1 className="font-serif text-6xl md:text-7xl text-[#30251F] mb-7">
          Thank you.
        </h1>

        <p className="text-base md:text-lg leading-relaxed text-[#806B57] mb-10">
          Your order has been placed successfully via Cash on Delivery.
          You can view it anytime in My Orders.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

          <Link
            to="/orders"
            className="w-full sm:w-auto bg-[#30251F] text-white px-8 py-4 text-xs tracking-[1.5px] hover:bg-[#4B382E] transition text-center"
          >
            VIEW MY ORDERS
          </Link>

          <Link
            to="/products"
            className="w-full sm:w-auto border border-[#D8D0C4] text-[#30251F] px-8 py-4 text-xs tracking-[1.5px] hover:bg-[#EEE8DF] transition text-center"
          >
            CONTINUE SHOPPING
          </Link>

        </div>

      </div>
    </div>
  );
}

export default OrderSuccess;
