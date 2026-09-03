import { useState, useEffect } from "react";
import useTransactions from "../../hooks/useTransactions";
import { useToast } from "../../context/ToastContext";
import { generateRandomTransaction } from "../../utils/transactionSimulator";

function LiveSimulator() {
  const [isLive, setIsLive] = useState(false);
  const {addTransaction} = useTransactions();
  const {showToast} = useToast();

  useEffect(() => {
    if (!isLive) return;

    const intervalId = setInterval(() => {
      const newTransaction = generateRandomTransaction();
      addTransaction(newTransaction);
      showToast(`New transaction: ${newTransaction.description}`, "info");
    }, 15000);

    return () => clearInterval(intervalId)
  }, [isLive, addTransaction, showToast])
  

  return (
    <div className="flex items-center gap-3">
      {isLive && (
        <span className="flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-600" />
          </span>
          Live
        </span>
      )}

      <button
        type="button"
        onClick={() => setIsLive((prev) => !prev)}
        className={`cursor-pointer rounded-full border px-3 py-1.5 text-xs font-medium transition-colors duration-200 ${
          isLive
            ? "border-green-600 text-green-700 hover:bg-green-50"
            : "border-gray-300 text-gray-600 hover:bg-gray-50"
        }`}
      >
        {isLive ? "Stop Simulation" : "Simulate Transactions"}
      </button>
    </div>
  );
}

export default LiveSimulator;
