import { getAllUsers, getUserProfile } from "@/services/authService";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = () =>
  useQuery({
    queryKey: ["get-user"],
    queryFn: getUserProfile,
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useGetAllUsers = () =>
  useQuery({
    queryKey: ["get-user"],
    queryFn: getAllUsers,
    retry: false,
    refetchOnWindowFocus: true,
  });
