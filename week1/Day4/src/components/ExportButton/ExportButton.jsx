import { useState } from "react";
import useTransactions from "../../hooks/useTransactions";
import { useToast } from "../../context/ToastContext";
import { convertToCSV, downloadCSV } from "../../utils/transactionUtils";
function ExportButton() {
  const [isExporting, setIsExporting] = useState(false);
  const { filteredTransactions } = useTransactions();
  const { showToast } = useToast();

  const handleExport = () => {
    setIsExporting(true);

    const csvContent = convertToCSV(filteredTransactions);
    const filename = `transactions_${new Date().toISOString().split("T")[0]}.csv`;

    downloadCSV(csvContent, filename);

    showToast("CSV exported successfully")
    setTimeout(() => {
      setIsExporting(false);
    }, 1200);
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={isExporting}
      className="flex cursor-pointer items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isExporting && (
        <svg
          className="h-4 w-4 animate-spin"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4Z"
          />
        </svg>
      )}
      {isExporting ? "Exporting..." : "Export CSV"}
    </button>
  );
}

export default ExportButton;
