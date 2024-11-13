/* eslint-disable @typescript-eslint/no-explicit-any */
const PaymentSuccessPage = async ({ searchParams }: any) => {
  const res = await fetch(
    // `https://tech-tips-and-tricks-hub-server-nu.vercel.app/api/payment/success?txnId=TXN-1731312725414`,
    `https://tech-tips-and-tricks-hub-server-nu.vercel.app/api/payment/success?txnId=${searchParams.txnId}`,
    // `http://localhost:5000/api/payment/success?txnId=${searchParams.txnId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );
  const data = await res.json();

  // console.log(data);

  if (!data.data) {
    return <div>no payment info exist </div>;
  }
  return (
    <div className="p-8 bg-green-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-green-600 mb-4">
        Payment Successful!
      </h1>
      <p className="text-gray-700 mb-2">
        Thank you for your payment. Here are the details:
      </p>

      <div className="mt-6 space-y-2">
        <div>
          <strong>User Name</strong> {data?.data?.author?.name}
        </div>
        <div>
          <strong>Email Name</strong> {data?.data?.author?.email}
        </div>
        <div>
          <strong>Transaction ID:</strong> {data?.data?.txtId}
        </div>
        <div>
          <strong>Amount:</strong> ${data?.data?.amount}
        </div>
        <div>
          <strong>Payment Method:</strong> {data?.data?.paymentMethod}
        </div>
        <div>
          <strong>Status:</strong> {data?.data?.isPayment ? "Paid" : "Pending"}
        </div>
        <div>
          <strong>Date:</strong>{" "}
          {new Date(data?.data?.createdAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
