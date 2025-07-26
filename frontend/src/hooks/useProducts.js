import {
  addProdcut,
  getOneProdcutById,
  getProducts,
  removeProduct,
  updateProduct,
} from "@/services/productService";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";

export const useGetProducts = () =>
  useQuery({
    queryKey: ["get-products"],
    queryFn: getProducts,
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useAddProduct = () => {
  return useMutation({ mutationFn: addProdcut });
};

export const useUpdateProduct = () => {
  return useMutation({ mutationFn: updateProduct });
};

export const useRemoveProduct = () => {
  return useMutation({ mutationFn: removeProduct });
};

export const useGetProductById = (id) =>
  useQuery({
    queryKey: ["get-product", id],
    queryFn: () => getOneProdcutById(id),
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useGetProductsByIds = (ids = []) => {
  const queries = useQueries({
    queries: ids.map((id) => ({
      queryKey: ["get-product", id],
      queryFn: () => getOneProdcutById(id),
      enabled: Boolean(id),
    })),
  });

  const isLoading = queries.some((q) => q.isLoading);
  const isError = queries.some((q) => q.isError);

  const products = queries.map((q) => q.data).filter(Boolean);

  return { products, isLoading, isError };
};
