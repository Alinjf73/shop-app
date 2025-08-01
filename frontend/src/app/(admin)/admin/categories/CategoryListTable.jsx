import Confirm from "@/common/Confirm";
import Modal from "@/common/Modal";
import { categoryListTableTHeads } from "@/constants/tableHeads";
import { useRemoveCategory } from "@/hooks/useCategories";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiTrash } from "react-icons/hi";
import { RiEdit2Line } from "react-icons/ri";

function CategoryListTable({ categories }) {
  const { mutateAsync, isLoading } = useRemoveCategory();
  const queryClient = useQueryClient();
  const [openModalId, setOpenModalId] = useState(null);

  const removeCategoryHandler = async (id) => {
    try {
      const { message } = await mutateAsync(id);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-categories"] });
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
            {categoryListTableTHeads.map((item) => {
              return (
                <th className="whitespace-nowrap table__th" key={item.id}>
                  {item.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => {
            return (
              <tr key={category._id}>
                <td className="table__td">{index + 1}</td>
                <td className="table__td  whitespace-nowrap font-bold">
                  {category.title}
                </td>
                <td className="table__td">{category.description}</td>
                <td className="table__td">{category.englishTitle}</td>
                <td className="table__td">
                  <span className="badge badge--secondary">
                    {category.type}
                  </span>
                </td>
                <td className="table__td font-bold text-lg">
                  <div className="flex items-center gap-x-4">
                    <button onClick={() => setOpenModalId(category._id)}>
                      <HiTrash className="text-rose-600 w-6 h-6" />
                    </button>

                    <Modal
                      open={openModalId === category._id}
                      onClose={() => setOpenModalId(null)}
                      title="حذف دسته بندی"
                    >
                      <Confirm
                        resourceName={`حذف دسته بندی ${category.title}`}
                        onClose={() => setOpenModalId(null)}
                        disabled={isLoading ? true : false}
                        onConfirm={() => removeCategoryHandler(category._id)}
                      />
                    </Modal>

                    <Link href={`/admin/categories/edit/${category._id}`}>
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

export default CategoryListTable;
