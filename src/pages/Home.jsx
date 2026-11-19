
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";

function Home() {
  const {
    data: products = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  // FIRST 4 PRODUCTS
  const featuredProducts = products.slice(0, 4);

  // CATEGORIES
  const categories = [
    {
      name: "Floral",
      description: "Luminous and tender",
    },
    {
      name: "Woody",
      description: "Grounded and enveloping",
    },
    {
      name: "Fresh",
      description: "Clear and invigorating",
    },
    {
      name: "Amber",
      description: "Warm and resonant",
    },
  ];

  return (
    <div className="bg-[#FAF8F3] text-[#30251F]">

      {/* HERO SECTION */}
      <section className="relative flex min-h-96 items-center overflow-hidden md:min-h-126">

        <img
          src="https://static.vecteezy.com/system/resources/previews/041/408/657/large_2x/ai-generated-perfume-bottle-next-to-pink-flowers-free-photo.jpeg"
          alt="Luxury perfume"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-linear-to-r from-[#FAF8F3]/95 via-[#FAF8F3]/75 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-12 md:px-10">

          <p className="mb-4 text-[9px] uppercase tracking-[3px] text-[#806B57]">
            THE NEW EAU DE PARFUM
          </p>

          <h1 className="max-w-xl font-serif text-3xl font-light leading-tight tracking-tight md:text-5xl">
            Scent, quietly considered.
          </h1>

          <p className="mt-5 max-w-lg font-serif text-sm leading-7 text-[#806052] md:text-lg md:leading-8">
            Distinctive fragrances shaped by nature,
            memory and the beauty of restraint.
          </p>

          <Link
            to="/products"
            className="mt-7 inline-flex items-center gap-6 bg-[#30251F] px-6 py-3.5 text-[10px] font-medium uppercase tracking-wider text-white transition hover:bg-[#49382F]"
          >
            DISCOVER THE COLLECTION
            <span className="text-base">→</span>
          </Link>

        </div>
      </section>

      {/* COLLECTION SECTION */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">

        {/* HEADING */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-[#D8D0C4] pb-6">

          <div>
            <p className="mb-2 text-[10px] uppercase tracking-[3px] text-[#806B57]">
              FIND YOUR SIGNATURE
            </p>

            <h2 className="font-serif text-3xl md:text-[32px]">
              The collection
            </h2>
          </div>

          <Link
            to="/products"
            className="border-b border-[#30251F] pb-2 text-[10px] uppercase tracking-widest"
          >
            VIEW ALL →
          </Link>

        </div>

        {/* LOADING */}
        {isPending && (
          <p className="py-12 text-center text-sm text-[#806B57]">
            Loading fragrances...
          </p>
        )}

        {/* ERROR */}
        {isError && (
          <p className="py-12 text-center text-sm text-red-500">
            Failed to load products.
          </p>
        )}

        {/* EMPTY PRODUCTS */}
        {!isPending && !isError && featuredProducts.length === 0 && (
          <p className="py-12 text-center text-sm text-[#806B57]">
            No fragrances available.
          </p>
        )}

        {/* PRODUCT CARDS */}
        {!isPending && !isError && featuredProducts.length > 0 && (
          <div className="grid grid-cols-2 items-stretch gap-4 md:grid-cols-4 md:gap-6">

            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}

          </div>
        )}

        {/* BRAND STORY */}
        <div className="mt-16 grid grid-cols-1 border border-[#D8D0C4] md:grid-cols-2">

          <div className="h-85 w-full overflow-hidden bg-[#F2EEE6] md:h-102.5">
            <img
              src="https://exaur.in/cdn/shop/files/Divine.png?v=1773940574"
              alt="Luxury fragrance"
              className="h-full w-full object-cover object-center"
            />
          </div>

          <div className="flex flex-col justify-center bg-[#F2EEE6] px-8 py-12 md:px-14">

            <p className="mb-5 text-[10px] uppercase tracking-[3px] text-[#806B57]">
              MADE WITH INTENTION
            </p>

            <h2 className="font-serif text-4xl">
              A study in subtlety.
            </h2>

            <p className="mt-6 max-w-md text-sm leading-7 text-[#806052]">
              Each Aurélia fragrance is built deliberately,
              layer upon layer. We work with natural botanicals
              and refined extracts to create scents that
              settle naturally on skin.
            </p>

            <Link
              to="/products"
              className="mt-8 w-fit border-b border-[#30251F] pb-2 text-[10px] uppercase tracking-widest"
            >
              EXPLORE FRAGRANCES →
            </Link>

          </div>
        </div>
      </section>

      {/* CATEGORY SECTION */}
      <section className="border-t border-[#D8D0C4] bg-[#F2EEE6] py-16">

        <div className="mx-auto max-w-7xl px-6 md:px-10">

          <p className="mb-2 text-[10px] uppercase tracking-[3px] text-[#806B57]">
            EXPLORE BY MOOD
          </p>

          <h2 className="font-serif text-3xl md:text-[32px]">
            A fragrance for every rhythm
          </h2>

          {/* CATEGORY CARDS */}
          <div className="mt-8 grid grid-cols-2 border-l border-t border-[#D8D0C4] md:grid-cols-4">

            {categories.map((category, index) => (
              <Link
                key={category.name}
                to={`/products?category=${category.name.toUpperCase()}`}
                className="group flex min-h-44 min-w-0 flex-col justify-between border-r border-b border-[#D8D0C4] bg-[#FAF8F3] px-4 py-6 sm:px-6 transition-colors duration-300 hover:bg-[#EAE4D9]"
              >

                {/* CATEGORY NUMBER */}
                <p className="text-[10px] text-[#9B8066]">
                  {String(index + 1).padStart(2, "0")}
                </p>

                {/* CATEGORY DETAILS */}
                <div className="mt-7">

                  <h3 className="font-serif text-2xl font-light text-[#30251F]">
                    {category.name}
                  </h3>

                  <p className="mt-2 text-xs text-[#9B8066]">
                    {category.description}
                  </p>

                  <span className="mt-4 inline-block text-lg text-[#30251F] transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>

                </div>

              </Link>
            ))}

          </div>
        </div>
      </section>

      {/* BOTTOM PHILOSOPHY */}
      <section className="bg-[#30251F] px-6 py-14 text-center text-white md:py-16">

        <p className="mb-6 text-[10px] uppercase tracking-[3px] text-[#D8C9B8]">
          OUR PHILOSOPHY
        </p>

        <h2 className="mx-auto max-w-4xl font-serif text-2xl font-light leading-relaxed md:text-3xl">
          “Fragrance should never enter the room before you do.
          <br className="hidden md:block" />
          It should be discovered.”
        </h2>

        <p className="mt-7 text-[10px] uppercase tracking-[2px] text-[#D8C9B8]">
          — ÉLISE LAURENT, FOUNDER
        </p>

      </section>

    </div>
  );
}

export default Home;
