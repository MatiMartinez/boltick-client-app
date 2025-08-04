import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { paymentService } from "../services/payment";
import { Status } from "../models/payment";

const useUpdatePayment = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const external_reference = searchParams.get("external_reference");
    const status = searchParams.get("status");

    if (!external_reference || !status) {
      navigate("/");
      return;
    }

    const doUpdate = async () => {
      setIsLoading(true);
      try {
        const formattedStatus = formatStatus(status);
        await updatePayment(external_reference, formattedStatus);
      } finally {
        setIsLoading(false);
      }
    };
    doUpdate();
  }, []);

  const updatePayment = async (id: string, status: Status) => {
    await paymentService.updatePayment({ id: id, callbackStatus: status });
  };

  const formatStatus = (status: string): Status => {
    switch (status) {
      case "pending":
        return "Pending";
      case "approved":
        return "Approved";
      case "rejected":
        return "Rejected";
      default:
        return "Pending";
    }
  };

  return { isLoading };
};

export default useUpdatePayment;
