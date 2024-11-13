/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Chart from "@/components/Shared/Chart";
import { useGetMonthlyPaymentQuery } from "@/redux/api/adminApi";
import { TMonthlyPaymentData } from "@/utils/types";
import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const { data, isLoading } = useGetMonthlyPaymentQuery("");

  const [allPayment, setAllPayment] = useState<TMonthlyPaymentData[]>();

  useEffect(() => {
    if (data?.success) {
      setAllPayment(data.data);
    }
  }, [data]);

  if (isLoading) {
    return <div className="flex items-center justify-center">loading</div>;
  }

  // console.log(data);
  return (
    <div>{allPayment && <Chart monthlyPaymentData={allPayment as any} />}</div>
  );
};

export default AdminDashboard;
