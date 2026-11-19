
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { getOrders } from "../services/orderService";

function Orders() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  // const [sort,setSort] = useState("ALL") 

  // LOGGED IN USER
  const user = useSelector((state) => state.auth.user);
    
  // FETCH ORDERS
  const {
    data: orders = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

// const SortedOrders = [...orders].sort((a, b) =>
//   sort === "old"
//     ? new Date(a.createdAt) - new Date(b.createdAt)
//     : new Date(b.createdAt) - new Date(a.createdAt)
// );

  // FILTER CURRENT USER'S ORDERS
  const validOrders = orders.filter((order) => {
    return (
      user?.id != null &&
      String(order.userId) === String(user.id) &&
      order.products?.length > 0
    );
  });

  if (isPending) {
    return (
      <p className="py-20 text-center text-[#806B57]">
        Loading orders...
      </p>
    );
  }

  if (isError) {
    return (
      <p className="py-20 text-center text-red-500">
        Something went wrong
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F3] px-5 py-16 text-[#30251F] md:px-10">

      <div className="mx-auto  max-w-333">

        {/* PAGE HEADING */}
        <div className="mb-11 flex items-end justify-between gap-4 border-b border-[#D8D0C4] pb-7">

          <div>
            <p className="mb-2 text-[12px] uppercase tracking-[3px] text-[#806B57]">
              ORDER HISTORY
            </p>

            <h1 className="font-serif text-5xl">
              My Orders
            </h1>
          </div>

          {/* <select value={sort}
          onChange={(e)=>setSort(e.target.value)}>
            <option   >sort for order</option>
            <option value="old" >old to new</option>
            <option value="new">new to old</option>
          </select> */}

          <Link
            to="/products"
            className="border-b border-[#30251F] pb-2 text-[12px] uppercase tracking-widest"
          >
            SHOP FRAGRANCES →
          </Link>

        </div>
        
  {/* {
    SortedOrders.map((order) => (
      <div key={order.id}>
        <h3>{order.id}</h3>
        <p>{order.createdAt}</p>
      </div>
    ))
  } */}


        {/* EMPTY ORDERS */}
        {validOrders.length === 0 ? (
          <p className="py-20 text-center text-[#806B57]">
            No orders yet.
          </p>
        ) : (
          <div className="space-y-5">

            {validOrders.map((order) => (
              <div
                key={order.id}
                className="border border-[#D8D0C4] bg-[#FFFEFC] px-7 py-8"
              >

                <div className="grid grid-cols-2 items-center gap-6 md:grid-cols-[1fr_1fr_1fr_1fr_auto]">

                  {/* ORDER ID */}
                  <div>
                    <p className="mb-2 text-[10px] uppercase tracking-wider text-[#9B8066]">
                      ORDER ID
                    </p>

                    <p className="text-sm font-medium">
                      {order.id}
                    </p>
                  </div>

                  {/* DATE */}
                  <div>
                    <p className="mb-2 text-[10px] uppercase tracking-wider text-[#9B8066]">
                      DATE
                    </p>

                    <p className="text-sm">
                      {order.createdAt &&
                        !Number.isNaN(Date.parse(order.createdAt))
                        ? new Date(order.createdAt).toLocaleDateString(
                          "en-GB",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )
                        : "—"}
                    </p>
                  </div>

                  {/* TOTAL */}
                  <div>
                    <p className="mb-2 text-[10px] uppercase tracking-wider text-[#9B8066]">
                      TOTAL AMOUNT
                    </p>

                    <p className="text-sm font-medium">
                      ₹{Number(order.total).toLocaleString("en-IN")}
                    </p>
                  </div>

                  {/* STATUS */}
                  <div>
                    <p className="mb-2 text-[10px] uppercase tracking-wider text-[#9B8066]">
                      STATUS
                    </p>

                    <span
                      className={`inline-block border px-3 py-1 text-xs ${order.status?.toLowerCase() === "delivered"
                          ? "border-[#A9B5A5] bg-[#F3F6F1] text-[#64775F]"
                          : "border-[#D8D0C4] bg-[#F4EFE6] text-[#806B57]"
                        }`}
                    >
                      {order.status || "Pending"}
                    </span>
                  </div>

                  {/* VIEW DETAILS */}
                  <div className="col-span-2 md:col-span-1">
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedOrder(
                          selectedOrder === order.id ? null : order.id
                        )
                      }
                      className="border border-[#D8D0C4] px-5 py-3 text-[11px] uppercase tracking-widest transition hover:bg-[#30251F] hover:text-white"
                    >
                      {selectedOrder === order.id
                        ? "HIDE DETAILS"
                        : "VIEW DETAILS"}
                    </button>
                  </div>

                </div>

                {/* EXPANDED ORDER DETAILS */}
                {selectedOrder === order.id && (
                  <div className="mt-7 border-t border-[#D8D0C4] pt-6">

                    <p className="mb-5 text-[11px] uppercase tracking-widest text-[#806B57]">
                      ORDERED PRODUCTS
                    </p>

                    <div className="space-y-4">
                      {order.products.map((product, index) => (
                        <div
                          key={`${product.id}-${index}`}
                          className="flex items-center gap-4"
                        >

                          <Link to={`/products/${product.id}`}>
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-20 w-16 object-cover"
                            />
                          </Link>

                          <div>
                            <p className="font-serif text-sm">
                              {product.name}
                            </p>

                            <p className="mt-1 text-xs text-[#806B57]">
                              Quantity: {product.quantity}
                            </p>

                            <p className="mt-1 text-xs">
                              ₹{Number(product.price).toLocaleString("en-IN")}
                            </p>
                          </div>

                        </div>
                      ))}
                    </div>

                  </div>
                )}

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default Orders;
