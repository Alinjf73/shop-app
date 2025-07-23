import { productListTableTHeads } from "@/constants/tableHeads";
import Link from "next/link";
import { RiEdit2Line } from "react-icons/ri";
import { HiEye, HiTrash } from "react-icons/hi";
import { useRemoveProduct } from "@/hooks/useProducts";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Modal from "@/common/Modal";
import Confirm from "@/common/Confirm";

function ProductListTable({ products }) {
  const { mutateAsync, isLoading } = useRemoveProduct();
  const queryClient = useQueryClient();
  const [openModalId, setOpenModalId] = useState(null);

  const removeProductHandler = async (id) => {
    try {
      const { message } = await mutateAsync(id);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-products"] });
      setOpenModalId(null);
    } catch (error) {
      toast.error(error?.respone?.data?.message);
    }
  };
  return (
    <div className="shadow-sm overflow-auto my-8">
      <table className="border-collapse table-auto w-full min-w-[800px] text-sm">
        <thead>
          <tr>
            {productListTableTHeads.map((item) => {
              return (
                <th className="whitespace-nowrap table__th" key={item.id}>
                  {item.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            return (
              <tr key={product._id}>
                <td className="table__td">{index + 1}</td>
                <td className="table__td  whitespace-nowrap font-bold">
                  {product.title}
                </td>
                <td className="table__td">
                  {product?.category?.title || "تعریف نشده"}
                </td>
                <td className="table__td">{product.price}</td>
                <td className="table__td">{product.discount}</td>
                <td className="table__td">{product.offPrice}</td>
                <td className="table__td">{product.countInStock}</td>
                <td className="table__td font-bold text-lg">
                  <div className="flex items-center gap-x-4">
                    <Link href={`/admin/products/${product._id}`}>
                      <HiEye className="text-primary-900 w-6 h-6" />
                    </Link>
                    <button onClick={() => setOpenModalId(product._id)}>
                      <HiTrash className="text-rose-600 w-6 h-6" />
                    </button>
                    <Modal
                      open={openModalId === product._id}
                      onClose={() => setOpenModalId(null)}
                      title="حذف محصول"
                    >
                      <Confirm
                        resourceName={`حذف محصول ${product.title}`}
                        onClose={() => setOpenModalId(null)}
                        disabled={isLoading ? true : false}
                        onConfirm={() => removeProductHandler(product._id)}
                      />
                    </Modal>
                    <Link href={`/admin/products/edit/${product._id}`}>
                      <RiEdit2Line className="w-6 h-6 text-secondary-600" />
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default ProductListTable;
