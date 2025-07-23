"use client";
import DashboardHeader from "@/common/DashboardHeader";
import Loading from "@/common/Loading";
import Stats from "./(dashboard)/Stats";
import { useGetAllUsers } from "@/hooks/useAuth";
import { useGetProducts } from "@/hooks/useProducts";
import { useGetPayments } from "@/hooks/usePayments";
import OrdersChart from "@/common/OrderChart";

function DashboardLayout() {
  const { data: usersData, isLoading: isLoadingUsers } = useGetAllUsers();
  const { data: productsData, isLoading: isLoadingProducts } = useGetProducts();
  const { data: paymentsData, isLoading: isLoadingPayments } = useGetPayments();
  const users = usersData?.users || [];
  const products = productsData?.products || [];
  const payments = paymentsData?.payments || [];

  if (isLoadingUsers || isLoadingProducts || isLoadingPayments)
    return <Loading />;
  return (
    <div>
      <DashboardHeader />
      <Stats users={users} products={products} payments={payments} />
      <OrdersChart payments={payments} />
    </div>
  );
}

export default DashboardLayout;
