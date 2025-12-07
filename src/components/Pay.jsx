import React, { useEffect } from "react";
import axios from "axios";

function Pay() {
  const id = new URLSearchParams(window.location.search).get("orderId");
  const api = "https://gigzi-dev.vercel.app";

  const send = (data) => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify(data));
    }
  };

  useEffect(() => {
    async function startPayment() {
      try {
        const res = await axios.get(`${api}/client/order/getOrderDetails/${id}`);
        const order = res.data.order;

        if (!order?.razorpayOrderId) {
          alert("Invalid Order");
          return;
        }

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY,
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
        send({ type: "payment-status", status: "failed", error: err.message });
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
