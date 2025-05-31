import React, { useEffect } from "react";
import axios from "axios";

function Pay() {
  const id = new URLSearchParams(window.location.search).get("orderId");
  const url = `https://gigzii-backend-cs4s.vercel.app`; 

  useEffect(() => {
    async function fetchOrder() {
      try {
        const res = await axios.get(`${url}/client/order/getOrderDetails/${id}`, {
          withCredentials: true,
        });

        const data = res.data;

        const postLog = (msg) => {
          window.ReactNativeWebView?.postMessage(
            JSON.stringify({ type: "log", msg })
          );
        };

        postLog("Fetched order data: " + JSON.stringify(data));

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY,
          amount: data.amount * 100,
          currency: "INR",
          name: "Gigzi",
          description: "Booking Artist",
          order_id: data.razorpayOrderId,
          handler: function (response) {
            postLog("Payment handler response: " + JSON.stringify(response));

            const successUrl = `/success?payment_id=${response.razorpay_payment_id}&order_id=${response.razorpay_order_id}&signature=${response.razorpay_signature}`;
            window.location.href = successUrl;
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp = new window.Razorpay(options);

        rzp.on("payment.failed", function (response) {
          postLog("Payment Failed: " + JSON.stringify(response.error));
          alert("Payment Failed: " + response.error.description);
        });

        rzp.open();
      } catch (error) {
        console.error(error);
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
