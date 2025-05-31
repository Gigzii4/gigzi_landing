import React, { useEffect } from "react";
import axios from "axios";

function Pay() {
  const url = import.meta.env.VITE_SERVER;
  const id = new URLSearchParams(window.location.search).get("orderId");

  useEffect(() => {
    async function fetchOrder() {
      try {
        const res = await axios.get(
          `${url}/client/order/getOrderDetails/${id}`
        );
        const data = res.data;

        if (!window.Razorpay) {
          console.error("Razorpay SDK not loaded");
          return;
        }

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY,
          order_id: data.razorpayOrderId,
          amount: data.amount * 100, // Razorpay accepts amount in paisa
          name: "Gigzi",
          description: "Event Booking Payment",
          handler: function (response) {
            window.location.href = `/success?payment_id=${response.razorpay_payment_id}&order_id=${response.razorpay_order_id}&signature=${response.razorpay_signature}`;
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        console.error("Error fetching order or opening Razorpay:", error);
        alert("Payment initialization failed. Please try again later.");
      }
    }

    fetchOrder();
  }, [id, url]);

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <p className="text-lg font-medium">Loading Payment...</p>
    </div>
  );
}

export default Pay;
