function Confirm({ resourceName, onClose, disabled, onConfirm }) {
  return (
    <div>
      <h1 className="font-bold text-base mb-8">
        آیا از {resourceName} مطمئن هستید؟
      </h1>
      <div className="flex items-center justify-between gap-x-16">
        <button onClick={onClose} className="btn btn--primary flex-1">
          لغو
        </button>
        <button
          onClick={onConfirm}
          disabled={disabled}
          className="btn btn--danger py-3 flex-1 hover:shadow-lg hover:bg-red-100"
        >
          تایید
        </button>
      </div>
    </div>
  );
}

export default Confirm;
