import { getCategories } from "@/services/categoryService";
import { getProducts } from "@/services/productService";
import CategorySidebar from "./CategorySidebar";
import queryString from "query-string";
import { cookies } from "next/headers";
import { toStringCookies } from "@/utils/toStringCookies";
import ProductCard from "@/common/ProductCard";
import LikeProduct from "./LikeProduct";

export const dynamic = "force-dynamic";

async function Products({ searchParams }) {
  const cookieStore = cookies();
  const strCookies = toStringCookies(cookieStore);

  const { products } = await getProducts(
    queryString.stringify(searchParams),
    strCookies
  );
  const { categories } = await getCategories();

  return (
    <div className="px-4">
      <h1 className="text-2xl font-extrabold mb-8">صفحه محصولات</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div>
          <CategorySidebar categories={categories} />
        </div>

        {/* Product List */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product}>
                {<LikeProduct product={product} />}
              </ProductCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
