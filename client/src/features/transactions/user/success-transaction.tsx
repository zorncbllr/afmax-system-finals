import { useEffect } from "react";
import { useVerifySuccess } from "../api/mutations";
import { useTransactionStore } from "../store";

const SuccessTransaction = () => {
  const { mutate } = useVerifySuccess();
  const { transactionId } = useTransactionStore();

  useEffect(() => {
    console.log(transactionId);
    if (transactionId) {
      mutate(transactionId);
    }
  }, []);

  return <div>Success Transaction</div>;
};

export default SuccessTransaction;
