import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export default function Success() {
  const [params] = useSearchParams();
  const [status, setStatus] = useState("Validating payment...");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const res = await axios.post(
          "https://gigzii-backend-e41i.vercel.app/client/order/verifyPayment",
          {
            razorpay_payment_id: params.get("payment_id"),
            razorpay_order_id: params.get("order_id"),
            razorpay_signature: params.get("signature"),
          },
          { withCredentials: true }
        );

        setStatus("✅ Payment succcesssful!");

        window.ReactNativeWebView?.postMessage(
          JSON.stringify({ type: "payment-status", status: "success" })
        );
      } catch (err) {
        console.error("Verification Error:", err);
        setStatus(" Payment succcesssful!.");
        window.ReactNativeWebView?.postMessage(
          JSON.stringify({ type: "payment-status", status: "failed" })
        );
      }
    };

    verifyPayment();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-2xl font-bold">{status}</h1>
    </div>
  );
}
