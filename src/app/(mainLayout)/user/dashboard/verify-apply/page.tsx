/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { usePaymentRequestMutation } from "@/redux/api/adminApi";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "sonner";

const VerifyPage = () => {
  console.log({ env: process.env.TINY_MCEE_EDITOR });
  const [paymentRequest, { isLoading }] = usePaymentRequestMutation();

  const user = useAppSelector((state) => state.userSlice.user);

  const handleSubscribe = async () => {
    try {
      const res = await paymentRequest({
        userId: user?._id,
        amount: 20,
      }).unwrap();
      if (res.success) {
        window.location.href = res.data.payment_url;
      }
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center">loading . . .</div>
    );
  }
  return (
    <div className="container mx-auto my-10 px-4 max-w-lg text-center">
      <h1 className="text-3xl font-semibold mb-6">Unlock Premium Content</h1>
      <p className="mb-4">
        Subscribe for <span className="font-bold">$20/month</span> to access
        premium blogs and videos with exclusive content designed just for tech
        enthusiasts like you.
      </p>

      <button
        onClick={handleSubscribe}
        className="bg-blue-600 text-white px-6 py-3 rounded-md mt-4 hover:bg-blue-700 transition disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Subscribe Now"}
      </button>

      <p className="text-gray-500 mt-6">
        Already subscribed?{" "}
        <a href="/login" className="text-blue-500 underline">
          Re Log in
        </a>{" "}
        to access your premium content.
      </p>
    </div>
  );
};

export default VerifyPage;
