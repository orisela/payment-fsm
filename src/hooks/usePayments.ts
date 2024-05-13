import { useEffect, useState } from 'react';
import { getApi, postApi } from '../api';

const usePayments = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [paymentList, setPayments] = useState([]);

  useEffect(() => {
    getApi('payments').then((response) => {
      setIsLoading(false);
      setPayments(response.data);
    });
  }, [setIsLoading, setPayments]);

  const createPayment = async () => {
    const response = await postApi('payments');
    return response.data.id;
  };

  return { isLoading, paymentList, createPayment };
};

export { usePayments };
