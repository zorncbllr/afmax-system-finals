import { useEffect } from "react";
import { useVerifyFailed } from "../api/mutations";
import { useTransactionStore } from "../store";

const FailedTransaction = () => {
  const { mutate } = useVerifyFailed();
  const { transactionId } = useTransactionStore();

  useEffect(() => {
    if (transactionId) {
      mutate(transactionId);
    }
  }, []);

  return <div>Failed Transaction</div>;
};

export default FailedTransaction;
