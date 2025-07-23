"use client";

import Loading from "@/common/Loading";
import { useGetAllUsers } from "@/hooks/useAuth";
import UsersTable from "./UsersTable";

function UsersPage() {
  const { isLoading, data } = useGetAllUsers();
  const { users } = data || {};

  if (isLoading) return <Loading />;
  return (
    <div>
      <h1>اطلاعات کاربران</h1>
      <UsersTable users={users} />
    </div>
  );
}

export default UsersPage;
