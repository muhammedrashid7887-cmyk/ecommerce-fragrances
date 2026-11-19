
import { Link, useNavigate } from "react-router-dom";
import {
  Heart,
  ShoppingBag,
  UserRound,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { logout } from "../redux/Slices/authSlice";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const [showAccount, setShowAccount] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // REDUX CART
  const cartItems = useSelector((state) => state.cart.items);

  // CURRENT USER WISHLIST
  const favitems = useSelector(
    (state) => state.fav.data[user?.id] || []
  );

  const cartCount = cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  const favCount = favitems.length;

  // LOGOUT
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    setShowAccount(false);
    navigate("/login");
  };

  // ACCOUNT ICON CLICK
  const handleAccount = () => {
    if (!user) {
      navigate("/login");
    } else {
      setShowAccount(!showAccount);
    }
  };

  return (
    <nav className="w-full border-b border-[#DED6C9] bg-[#FAF8F3]">
      <div className="mx-auto flex h-17 max-w-6xl items-center justify-between px-6">

        {/* LOGO */}
        <Link
          to="/"
          className="font-serif text-xl font-light tracking-[2px] text-[#30231C]"
        >
          AURÉLIA
        </Link>

        {/* NAVIGATION LINKS */}
        <div className="hidden items-center gap-7 text-xs font-normal text-[#65594D] lg:flex">
          <Link to="/" className="transition hover:text-black">
            Home
          </Link>

          <Link to="/products" className="transition hover:text-black">
            Fragrances
          </Link>

          <Link to="/about" className="transition hover:text-black">
            About
          </Link>

          <Link to="/orders" className="transition hover:text-black">
            My Orders
          </Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4 text-xs">

          {/* ACCOUNT */}
          <div className="relative">
            <button
              type="button"
              onClick={handleAccount}
              className="text-[#30251F] transition hover:text-[#806B57]"
              aria-label="My Account"
            >
              <UserRound size={21} strokeWidth={1.5} />
            </button>

            {/* ACCOUNT DROPDOWN */}
            {user && showAccount && (
              <div className="absolute right-0 top-9 z-50 w-44 border border-[#DED6C9] bg-[#FFFEFC] p-3 shadow-md">

                <p className="mb-3 border-b border-[#DED6C9] pb-2 text-[11px] text-[#65594D]">
                  {user.FullName}
                </p>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 text-left text-xs text-[#30251F] transition hover:text-red-500"
                >
                  <LogOut size={15} />
                  Logout
                </button>

              </div>
            )}
          </div>

          {/* WISHLIST */}
          <Link
            to="/wishlist"
            className="relative inline-flex items-center text-[#30231C]"
            aria-label="Wishlist"
          >
            <Heart size={18} strokeWidth={1.3} />

            {favCount > 0 && (
              <span className="absolute -right-3 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#30251F] px-1 text-[9px] text-white">
                {favCount}
              </span>
            )}
          </Link>

          {/* CART */}
          <Link
            to="/cart"
            className="relative inline-flex items-center text-[#30231C]"
            aria-label="Shopping cart"
          >
            <ShoppingBag size={18} strokeWidth={1.3} />

            {cartCount > 0 && (
              <span className="absolute -right-3 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#30251F] px-1 text-[9px] text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            onClick={() => setShowMenu(!showMenu)}
            className="inline-flex items-center text-[#30231C] lg:hidden"
            aria-label={showMenu ? "Close menu" : "Open menu"}
            aria-expanded={showMenu}
            aria-controls="mobile-navigation"
          >
            {showMenu ? (
              <X size={18} strokeWidth={1.3} />
            ) : (
              <Menu size={18} strokeWidth={1.3} />
            )}
          </button>

        </div>
      </div>

      {/* MOBILE NAVIGATION */}
      {showMenu && (
        <div
          id="mobile-navigation"
          className="border-t border-[#DED6C9] px-6 py-4 lg:hidden"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-4 text-xs font-normal text-[#65594D]">

            <Link
              to="/"
              onClick={() => setShowMenu(false)}
              className="transition hover:text-black"
            >
              Home
            </Link>

            <Link
              to="/products"
              onClick={() => setShowMenu(false)}
              className="transition hover:text-black"
            >
              Fragrances
            </Link>

            <Link
              to="/about"
              onClick={() => setShowMenu(false)}
              className="transition hover:text-black"
            >
              About
            </Link>

            <Link
              to="/orders"
              onClick={() => setShowMenu(false)}
              className="transition hover:text-black"
            >
              My Orders
            </Link>

          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
