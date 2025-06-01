import React, { useEffect } from "react";
import axios from "axios";

function Pay() {
  const id = new URLSearchParams(window.location.search).get("orderId");
  const url = `https://gigzii-backend-e41i.vercel.app`;

  useEffect(() => {
    async function fetchOrder() {
      try {
        const res = await axios.get(`${url}/client/order/getOrderDetails/${id}`, {
          withCredentials: true,
        });

        const data = res.data.order; 

        // Log helper to send messages to React Native app
        const postLog = (msg) => {
          console.log("[Pay Page]:", msg); // Also log to browser console
          window.ReactNativeWebView?.postMessage(
            JSON.stringify({ type: "log", msg })
          );
        };

        postLog("Fetched order data: " + JSON.stringify(data));

        if (!data.razorpayOrderId || !data.amount) {
          postLog("Error: Invalid order data");
          alert("Order data invalid. Cannot proceed with payment.");
          return;
        }

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY,
          amount: data.amount * 100, // in paise
          currency: "INR",
          name: "Gigzi",
          description: "Booking Artist",
          order_id: data.razorpayOrderId,
          handler: function (response) {
            const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

            postLog("Payment Success: " + JSON.stringify(response));

            // Redirect to success page with payment details
            const successUrl = `/success?payment_id=${razorpay_payment_id}&order_id=${razorpay_order_id}&signature=${razorpay_signature}`;
            window.location.href = successUrl;
          },
          theme: { color: "#3399cc" },
        };

        const rzp = new window.Razorpay(options);

        rzp.on("payment.failed", function (response) {
          postLog("Payment Failed: " + JSON.stringify(response.error));
          alert("Payment Failed: " + response.error.description);
        });

        rzp.open();
      } catch (error) {
        console.error("Fetch Order Error:", error);
        window.ReactNativeWebView?.postMessage(
          JSON.stringify({
            type: "log",
            msg: "Payment error: " + error.message,
          })
        );
      }
    }

    fetchOrder();
  }, [id]);

  return (
    <div className="flex justify-center items-center w-full h-full">
      <p>Loading Payment.....</p>
    </div>
  );
}

export default Pay;
