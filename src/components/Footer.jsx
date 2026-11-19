
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="w-full bg-[#FAF8F3] text-[#49382F] border-t border-[#DED8CE]">

      {/* Main Footer */}
      <div className="max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-16 py-14 md:py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h2 className="font-serif text-2xl tracking-[0.12em] mb-6">
              AURÉLIA
            </h2>

            <p className="max-w-xl text-[16px] leading-[1.8] text-[#806F64]">
              Aurélia Parfums is an independent fragrance house
              dedicated to transparent ingredients, considered
              craft, and scents of quiet distinction.
            </p>
          </div>

          {/* Fragrances */}
          <div>
            <h3 className="font-serif text-xl mb-6">
              Fragrances
            </h3>

            <ul className="space-y-3 text-[16px]">
              <li>
                <Link to="/products" className="hover:text-[#A17B55] transition">All Fragrances</Link>
              </li>
              <li>
                <Link to="/products?category=floral" className="hover:text-[#A17B55] transition">Floral</Link>
              </li>
              <li>
                <Link to="/products?category=fresh" className="hover:text-[#A17B55] transition">Fresh</Link>
              </li>
              <li>
                <Link to="/products?category=woody" className="hover:text-[#A17B55] transition">Woody</Link>
              </li>
              <li>
                <Link to="/products?category=amber" className="hover:text-[#A17B55] transition">Amber</Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="font-serif text-xl mb-6">
              Account
            </h3>

            <ul className="space-y-3 text-[16px]">
              <li>
                <Link to="/wishlist" className="hover:text-[#A17B55] transition">Wishlist</Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-[#A17B55] transition">Shopping Bag</Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-[#A17B55] transition">My Orders</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-[#A17B55] transition">Login / Register</Link>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-[#DED8CE]">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-16 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">

          <p className="text-xs tracking-[0.12em] text-[#806F64]">
            © 2026 AURÉLIA PARFUMS
          </p>

          <p className="text-xs tracking-[0.12em] text-[#806F64]">
            PARIS · MUMBAI
          </p>

        </div>
      </div>

    </footer>
  )
}

export default Footer
