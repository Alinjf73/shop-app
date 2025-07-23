import { toPersianNumbers } from "@/utils/toPersianNumbers";

const colors = {
  primary: "bg-primary-100 text-primary-700",
  green: "bg-green-100 text-green-700",
  yellow: "bg-yellow-100 text-yellow-700",
};

function Stat({ icon, value, title, color }) {
  const bgClass = colors[color] || colors["primary"];

  return (
    <div className="grid grid-rows-2 grid-cols-[5rem_1fr] bg-white border rounded-xl shadow-sm p-4 gap-x-4 hover:shadow-md transition-all duration-300">
      <div
        className={`row-span-2 flex items-center justify-center aspect-square rounded-full ${bgClass}`}
      >
        {icon}
      </div>
      <h5 className="font-bold text-sm text-gray-500 self-center">{title}</h5>
      <p className="text-2xl font-extrabold text-gray-900">
        {toPersianNumbers(value)}
      </p>
    </div>
  );
}

export default Stat;
