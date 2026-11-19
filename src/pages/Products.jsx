
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productService";

function Products() {
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // CATEGORY FROM URL
  const [searchParams, setSearchParams] = useSearchParams();

  const category = (
    searchParams.get("category") || "ALL"
  ).trim().toUpperCase();

  // CHANGE CATEGORY
  const setCategory = (value) => {
    setSearchParams(
      value === "ALL" ? {} : { category: value }
    );  
    setPage(1);
  };

  const perPage = 6;

  // FETCH PRODUCTS
  const {
    data: products = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  // SEARCH
  const searchProducts = products.filter((product) => {
    const searchText = search.trim().toLowerCase();

    return (
      (product.name || "")
        .toLowerCase()
        .includes(searchText) ||
      (product.subtitle || "")
        .toLowerCase()
        .includes(searchText)
    );
  });

  // CATEGORY FILTER
  const filteredProducts = searchProducts.filter((product) => {
    if (category === "ALL") return true;

    return (
      product.category?.trim().toUpperCase() === category
    );
  });

  // SORT
  const sortedProducts = [...filteredProducts];

  if (sort === "high") {
    sortedProducts.sort(
      (a, b) => Number(b.price) - Number(a.price)
    );
  } else if (sort === "low") {
    sortedProducts.sort(
      (a, b) => Number(a.price) - Number(b.price)
    );
  }

  // PAGINATION
  const totalPages = Math.ceil(
    sortedProducts.length / perPage
  );

  const currentPage = Math.min(
    page,
    Math.max(totalPages, 1)
  );

  const start = (currentPage - 1) * perPage;

  const currentProducts = sortedProducts.slice(
    start,
    start + perPage
  );

  return (
    <div className="min-h-screen bg-[#FAF8F3] px-5 py-10 md:px-10 lg:px-16">

      <div className="mx-auto max-w-6xl">

        {/* PAGE HEADING */}
        <div className="mb-6 border-b border-[#D8D0C4] pb-5">

          <p className="mb-2 text-[9px] uppercase tracking-[3px] text-[#9B8066]">
            THE CATALOG
          </p>

          <div className="flex items-end justify-between">

            <h1 className="font-serif text-3xl font-light text-[#30251F] md:text-5xl">
              All Fragrances
            </h1>

            <p className="hidden text-[10px] text-[#9B8E80] md:block">
              Discover our collection, made to be part of your story.
            </p>

          </div>
        </div>

        {/* SEARCH & FILTERS */}
        <div className="mb-8 border border-[#D8D0C4] bg-[#F2EEE6] p-4">

          <div className="flex flex-wrap items-center gap-2">

            {/* SEARCH */}
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search fragrances by name..."
              aria-label="Search fragrances"
              className="min-w-0 basis-full flex-1 border border-[#D8D0C4] bg-[#FFFEFC] px-3 py-2 text-xs outline-none focus:border-[#49382F] lg:basis-40"
            />

            {/* ALL */}
            <button
              type="button"
              onClick={() => setCategory("ALL")}
              className={`border border-[#D8D0C4] px-4 py-2 text-[9px] tracking-wider transition hover:bg-[#30251F] hover:text-white ${
                category === "ALL"
                  ? "bg-[#30251F] text-white"
                  : "bg-transparent text-[#30251F]"
              }`}
            >
              ALL
            </button>

            {/* FLORAL */}
            <button
              type="button"
              onClick={() => setCategory("FLORAL")}
              className={`border border-[#D8D0C4] px-3 py-2 text-[9px] transition hover:bg-[#30251F] hover:text-white ${
                category === "FLORAL"
                  ? "bg-[#30251F] text-white"
                  : "bg-transparent text-[#30251F]"
              }`}
            >
              FLORAL
            </button>

            {/* WOODY */}
            <button
              type="button"
              onClick={() => setCategory("WOODY")}
              className={`border border-[#D8D0C4] px-3 py-2 text-[9px] transition hover:bg-[#30251F] hover:text-white ${
                category === "WOODY"
                  ? "bg-[#30251F] text-white"
                  : "bg-transparent text-[#30251F]"
              }`}
            >
              WOODY
            </button>

            {/* FRESH */}
            <button
              type="button"
              onClick={() => setCategory("FRESH")}
              className={`border border-[#D8D0C4] px-3 py-2 text-[9px] transition hover:bg-[#30251F] hover:text-white ${
                category === "FRESH"
                  ? "bg-[#30251F] text-white"
                  : "bg-transparent text-[#30251F]"
              }`}
            >
              FRESH
            </button>

            {/* AMBER */}
            <button
              type="button"
              onClick={() => setCategory("AMBER")}
              className={`border border-[#D8D0C4] px-3 py-2 text-[9px] transition hover:bg-[#30251F] hover:text-white ${
                category === "AMBER"
                  ? "bg-[#30251F] text-white"
                  : "bg-transparent text-[#30251F]"
              }`}
            >
              AMBER
            </button>

            {/* SORT */}
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
              }}
              aria-label="Sort products"
              className="max-w-full border border-[#D8D0C4] bg-[#FFFEFC] px-3 py-2 text-[10px] outline-none"
            >
              <option value="">Sort by price</option>
              <option value="high">
                Price: High to Low
              </option>
              <option value="low">
                Price: Low to High
              </option>
            </select>

          </div>
        </div>

        {/* LOADING */}
        {isPending && (
          <p className="py-10 text-center text-[#9B8066]">
            Loading products...
          </p>
        )}

        {/* ERROR */}
        {isError && (
          <p className="py-10 text-center text-red-500">
            {error?.message || "Failed to load products."}
          </p>
        )}

        {/* PRODUCTS */}
        {!isPending && !isError && (
          <>

            {/* PRODUCT COUNT */}
            <p className="mb-4 text-[9px] uppercase tracking-wider text-[#9B8066]">
              Showing {currentProducts.length} of{" "}
              {sortedProducts.length} products
            </p>

            {/* PRODUCT GRID */}
            <div className="grid grid-cols-1 gap-6 min-[425px]:grid-cols-2 md:grid-cols-3 md:gap-8">

              {currentProducts.map((pt) => (
                <ProductCard
                  key={pt.id}
                  product={pt}
                />
              ))}

            </div>

            {/* EMPTY MESSAGE */}
            {sortedProducts.length === 0 && (
              <p className="py-10 text-center text-[#9B8066]">
                No products found.
              </p>
            )}

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2 border-t border-[#D8D0C4] pt-6">

                {/* PREV */}
                <button
                  type="button"
                  onClick={() => setPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="border border-[#D8D0C4] px-3 py-2 text-[9px] text-[#9B8E80] disabled:opacity-40"
                >
                  PREV
                </button>

                {/* PAGE NUMBERS */}
                {Array.from(
                  { length: totalPages },
                  (_, i) => (
                    <button
                      type="button"
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`h-7 w-7 text-[10px] ${
                        currentPage === i + 1
                          ? "bg-[#30251F] text-white"
                          : "border border-[#D8D0C4]"
                      }`}
                    >
                      {i + 1}
                    </button>
                  )
                )}

                {/* NEXT */}
                <button
                  type="button"
                  onClick={() => setPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="border border-[#D8D0C4] px-3 py-2 text-[9px] disabled:opacity-40"
                >
                  NEXT
                </button>

              </div>
            )}

          </>
        )}

      </div>
    </div>
  );
}

export default Products;
