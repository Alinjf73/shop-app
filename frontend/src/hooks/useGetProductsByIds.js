import { useEffect, useState } from "react";
import { useGetProductById } from "./useProducts";

export function useGetProductsByIds(ids) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!ids || ids.length === 0) {
      setProducts([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    Promise.all(ids.map((id) => useGetProductById(id)))
      .then((results) => {
        setProducts(results);
      })
      .finally(() => setIsLoading(false));
  }, [ids]);

  return { products, isLoading };
}
