import { getAllPayments, getOnePaymentById } from "@/services/paymentService";
import { useQuery } from "@tanstack/react-query";

export const useGetPayments = () =>
  useQuery({ queryKey: ["payments"], queryFn: getAllPayments, retry: false });

export const useGetOnePayment = (id) =>
  useQuery({
    queryKey: ["payment", id],
    queryFn: () => getOnePaymentById(id),
    retry: false,
  });
