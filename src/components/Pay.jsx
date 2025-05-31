import React, { useEffect } from "react";
import axios from "axios";

function Pay() {
  let url = `http://192.168.200.77:5000`;
  const id = new URLSearchParams(window.location.search).get("orderId");

  useEffect(() => {
    async function fetchOrder() {
      try {
        const res = await axios.get(
          `${url}/client/order/getOrderDetails/${id}`
        );
        const data = res.data;

        // Send log to WebView
        const postLog = (msg) => {
          window.ReactNativeWebView?.postMessage(
            JSON.stringify({ type: "log", msg })
          );
        };

        postLog("Fetched order data");
        postLog(JSON.stringify(data));

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY,
          order_id: data.razorpayOrderId,
          amount: data.amount * 100,
          name: "Gigzi",
          handler: function (response) {
            const successUrl = `/success?payment_id=${response.razorpay_payment_id}&order_id=${response.razorpay_order_id}&signature=${response.razorpay_signature}`;
            postLog("Redirecting to: " + successUrl);
            window.location.href = successUrl;
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp = new window.Razorpay(options);
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
