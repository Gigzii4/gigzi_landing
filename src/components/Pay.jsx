import React, { useEffect } from "react";
import axios from "axios";

function Pay() {
  const id = new URLSearchParams(window.location.search).get("orderId");
  const url = `https://gigzi-dev.vercel.app`;

  // Safe message sender
  const sendToApp = (data) => {
    try {
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify(data));
      }
      console.log("[Pay Page]:", data);
    } catch (err) {
      console.log("Message send failed:", err);
    }
  };

  useEffect(() => {
    async function fetchOrder() {
      try {
        const res = await axios.get(`${url}/client/order/getOrderDetails/${id}`, {
          withCredentials: true,
        });

        const data = res.data.order;

        if (!data?.razorpayOrderId || !data?.amount) {
          sendToApp({ type: "log", msg: "Invalid order data" });
          alert("Invalid order information");
          return;
        }

        sendToApp({ type: "log", msg: "Order fetched successfully" });

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY,
          amount: data.amount * 100,
          currency: "INR",
          name: "Gigzi",
          description: "Artist Booking",
          order_id: data.razorpayOrderId,

          handler: function (response) {
            sendToApp({
              type: "payment-status",
              status: "success",
              data: response,
            });

            // Redirect for WebView URL detection
            const successUrl = `/success?paid=true&payment_id=${response.razorpay_payment_id}`;
            window.location.href = successUrl;
          },

          theme: { color: "#3399cc" },
        };

        const rzp = new window.Razorpay(options);

        rzp.on("payment.failed", function (response) {
          sendToApp({
            type: "payment-status",
            status: "failed",
            error: response.error,
          });

          // Redirect so WebView can detect failed
          const failedUrl = `/failed?error=true&reason=${encodeURIComponent(
            response.error.description
          )}`;
          window.location.href = failedUrl;
        });

        rzp.open();
      } catch (error) {
        sendToApp({
          type: "log",
          msg: "Payment load error: " + error.message,
        });
      }
    }

    fetchOrder();
  }, [id]);

  return (
    <div className="flex justify-center items-center w-full h-full">
      <p>Loading Payment...</p>
    </div>
  );
}

export default Pay;
