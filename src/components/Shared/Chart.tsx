/* eslint-disable @typescript-eslint/no-explicit-any */
import { TMonthlyPaymentData } from "@/utils/types";
import React from "react";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const Chart = ({
  monthlyPaymentData,
}: {
  monthlyPaymentData: TMonthlyPaymentData[];
}) => {
  const data = monthlyPaymentData.map((entry) => ({
    name: `${entry._id.year} - ${entry._id.month}`,
    uv: entry.totalAmount,
  }));
  return (
    <div>
      <h2 className="py-3 font-semibold ">Monthly Payment Info Data</h2>

      <AreaChart
        width={600}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </div>
  );
};

export default Chart;
