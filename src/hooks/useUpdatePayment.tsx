import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { paymentService } from '../services/payment';
import { Status } from '../models/payment';

const useUpdatePayment = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const external_reference = searchParams.get('external_reference');
    const status = searchParams.get('status');

    if (!external_reference || !status) {
      navigate('/');
      return;
    }

    updatePayment(external_reference, status as Status);
  }, []);

  const updatePayment = async (id: string, status: Status) => {
    await paymentService.updatePayment({ id: id, callbackStatus: status });
  };

  return {};
};

export default useUpdatePayment;
