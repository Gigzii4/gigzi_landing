import React, { useEffect } from "react";
import axios from "axios";

function Pay() {
  const id = new URLSearchParams(window.location.search).get("orderId");
  const api =
    import.meta.env.VITE_BACKEND_URL ||
    import.meta.env.VITE_API_URL ||
    import.meta.env.VITE_API_BASE_URL

  // Env design (NO PROD flag required):
  // - If you provide a single key, we use it.
  // - If you provide both LIVE and TEST, we prefer LIVE by default.
  //
  // Supported env var names (prefer *_ID for clarity):
  // - VITE_RAZORPAY_KEY_ID (single key to use)
  // - VITE_RAZORPAY_KEY_ID_LIVE / VITE_RAZORPAY_KEY_ID_TEST
  // - VITE_RAZORPAY_KEY (legacy single key)
  // - VITE_RAZORPAY_KEY_LIVE / VITE_RAZORPAY_KEY_TEST (legacy)
  
  const razorpayKey =
    import.meta.env.VITE_RAZORPAY_KEY_ID ||
    import.meta.env.VITE_RAZORPAY_KEY_ID_LIVE ||
    import.meta.env.VITE_RAZORPAY_KEY_LIVE ||
    import.meta.env.VITE_RAZORPAY_KEY_ID_TEST ||
    import.meta.env.VITE_RAZORPAY_KEY_TEST ||
    import.meta.env.VITE_RAZORPAY_KEY;

  const send = (data) => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify(data));
    }
  };

  useEffect(() => {
    async function startPayment() {
      try {
        // Prefer the key id from backend (prevents test/live mismatch with order_id).
        // Fallback to env if backend endpoint isn't available.
        let keyFromServer = null;
        try {
          const keyRes = await axios.get(`${api}/client/order/public/razorpayKey`);
          if (keyRes?.data?.success && keyRes.data.keyId) {
            keyFromServer = keyRes.data.keyId;
          }
        } catch {
          // ignore and fallback to env
        }

        const finalKey = keyFromServer || razorpayKey;
        if (!finalKey) {
          throw new Error(
            "Razorpay key is missing. Configure it on backend (/client/order/public/razorpayKey) or set VITE_RAZORPAY_KEY_ID in your .env."
          );
        }

        // Use public endpoint for payment gateway (no auth required)
        const res = await axios.get(`${api}/client/order/getOrderDetailsForPayment/${id}`);
        
        if (!res.data?.success || !res.data?.order) {
          send({ type: "payment-status", status: "failed", error: "Invalid Order" });
          alert("Invalid Order");
          return;
        }

        const order = res.data.order;

        if (!order?.razorpayOrderId) {
          send({ type: "payment-status", status: "failed", error: "Invalid Order ID" });
          alert("Invalid Order");
          return;
        }

        const options = {
          key: finalKey,
          amount: order.amount * 100,
          currency: "INR",
          name: "Gigzi",
          description: "Artist Booking",
          order_id: order.razorpayOrderId,

          handler: function (response) {
            send({ type: "payment-status", status: "success", data: response });
            window.location.href = "/success";
          },

          theme: { color: "#4D55CC" },
        };

        const rzp = new window.Razorpay(options);

        rzp.on("payment.failed", function (response) {
          send({ type: "payment-status", status: "failed", error: response.error });
          window.location.href = "/failed";
        });

        rzp.open();
      } catch (err) {
        console.error("Payment initialization error:", err);
        const errorMessage = err.response?.data?.error || err.message || "Failed to initialize payment";
        send({ type: "payment-status", status: "failed", error: errorMessage });
        alert(`Payment Error: ${errorMessage}`);
      }
    }

    startPayment();
  }, [id]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p>Loading Payment...</p>
    </div>
  );
}

export default Pay;
