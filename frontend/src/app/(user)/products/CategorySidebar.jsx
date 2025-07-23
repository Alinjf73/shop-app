"use client";

import { GiHamburgerMenu } from "react-icons/gi";
import ProductsFilter from "./ProductsFilter";
import ProductsSort from "./ProductsSort";
import { useState } from "react";

function CategorySidebar({ categories }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div>
      <div className="lg:hidden mb-4">
        <button
          className="text-2xl"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <GiHamburgerMenu />
        </button>
      </div>

      {/* mobile sidebar */}
      {isSidebarOpen && (
        <div className="lg:hidden col-span-1 space-y-10 mb-6">
          <ProductsFilter categories={categories} />
          <ProductsSort />
        </div>
      )}

      {/* desktop sidebar */}
      <div className="hidden lg:block col-span-1 space-y-10">
        <ProductsFilter categories={categories} />
        <ProductsSort />
      </div>
    </div>
  );
}

export default CategorySidebar;
