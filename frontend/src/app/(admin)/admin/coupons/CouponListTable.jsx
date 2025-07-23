import Confirm from "@/common/Confirm";
import Modal from "@/common/Modal";
import { couponListTableTHeads } from "@/constants/tableHeads";
import { useRemoveCoupon } from "@/hooks/useCoupons";
import { toLocalDateStringShort } from "@/utils/toLocalDate";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { HiTrash } from "react-icons/hi";
import { RiEdit2Line } from "react-icons/ri";

function CouponListTable({ coupons }) {
  const { mutateAsync, isLoading } = useRemoveCoupon();
  const queryClient = useQueryClient();
  const [openModalId, setOpenModalId] = useState(null);

  const removeCouponHandler = async (id) => {
    try {
      const { message } = await mutateAsync(id);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-coupons"] });
      setOpenModalId(null);
    } catch (error) {
      toast.error(error?.response?.data?.message || "خطا در حذف کوپن");
    }
  };

  return (
    <div className="shadow-sm overflow-auto my-8">
      <table className="border-collapse table-auto w-full min-w-[800px] text-sm">
        <thead>
          <tr>
            {couponListTableTHeads.map((item) => (
              <th className="whitespace-nowrap table__th" key={item.id}>
                {item.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon, index) => (
            <tr key={coupon._id}>
              <td className="table__td">{index + 1}</td>
              <td className="table__td font-bold whitespace-nowrap">
                {coupon.code}
              </td>
              <td className="table__td">
                <span className="badge badge--primary">{coupon.type}</span>
              </td>
              <td className="table__td">{coupon.amount}</td>
              <td className="table__td">
                <div className="flex flex-col gap-1">
                  {coupon.productIds.map((p) => (
                    <span key={p._id} className="badge badge--secondary">
                      {p.title}
                    </span>
                  ))}
                </div>
              </td>
              <td className="table__td">{coupon.usageCount}</td>
              <td className="table__td">{coupon.usageLimit}</td>
              <td className="table__td">
                {toLocalDateStringShort(coupon.expireDate)}
              </td>
              <td className="table__td font-bold text-lg">
                <div className="flex items-center gap-x-4">
                  <button onClick={() => setOpenModalId(coupon._id)}>
                    <HiTrash className="text-rose-600 w-6 h-6" />
                  </button>

                  <Modal
                    open={openModalId === coupon._id}
                    onClose={() => setOpenModalId(null)}
                    title="حذف کوپن"
                  >
                    <Confirm
                      resourceName={`حذف کوپن ${coupon.code}`}
                      onClose={() => setOpenModalId(null)}
                      disabled={isLoading ? true : false}
                      onConfirm={() => removeCouponHandler(coupon._id)}
                    />
                  </Modal>

                  <Link href={`/admin/coupons/edit/${coupon._id}`}>
                    <RiEdit2Line className="w-6 h-6 text-secondary-600" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default CouponListTable;
