import useToast from "../../hooks/useToast";

const STYLES = {
  success: "bg-green-50 border-green-200 text-green-800",
  error: "bg-red-50 border-red-200 text-red-800",
  info: "bg-blue-50 border-blue-200 text-blue-800",
};

function Toast() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex w-80 flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-start justify-between gap-3 rounded-lg border px-4 py-3 text-sm shadow-lg animate-[toast-in_0.2s_ease-out] ${
            STYLES[toast.type] || STYLES.info
          }`}
        >
          <span>{toast.message}</span>
          <button
            type="button"
            onClick={() => removeToast(toast.id)}
            className="cursor-pointer text-current opacity-60 hover:opacity-100"
            aria-label="Dismiss notification"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}

export default Toast;
