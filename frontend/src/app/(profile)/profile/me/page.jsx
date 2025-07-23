"use client";

import Loading from "@/common/Loading";
import TextField from "@/common/TextField";
import { useGetUser } from "@/hooks/useAuth";
import { updateProfile } from "@/services/authService";
import { includeObj } from "@/utils/objectUtils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const fieldLabels = {
  name: "نام و نام خانوادگی",
  email: "ایمیل",
  phoneNumber: "شماره تماس",
  biography: "بیوگرافی",
};

function MePage() {
  const { data, isLoading } = useGetUser();
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutateAsync } = useMutation({
    mutationFn: updateProfile,
  });

  const [formData, setFormData] = useState({});
  const { user } = data || {};
  const includeskey = ["name", "email", "phoneNumber", "biography"];

  useEffect(() => {
    if (user) setFormData(includeObj(user, includeskey));
  }, [user]);

  const sumbitHandler = async (e) => {
    e.preventDefault();
    try {
      const { message } = await mutateAsync(formData);
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
      toast.success(message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-6 text-secondary-700">
        ویرایش اطلاعات کاربری
      </h1>

      <form onSubmit={sumbitHandler} className="space-y-5">
        {Object.keys(includeObj(user, includeskey)).map((key) => (
          <TextField
            label={fieldLabels[key] || key}
            name={key}
            key={key}
            value={formData[key] || ""}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
        ))}

        <div className="pt-4">
          {isUpdating ? (
            <Loading />
          ) : (
            <button type="submit" className="btn btn--primary w-full">
              ذخیره تغییرات
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default MePage;
