import React, { useEffect } from "react";

import axios from "axios";

function Pay() {
  let url = import.meta.env.VITE_SERVER;
  const id = new URLSearchParams(window.location.search).get("orderId");

  useEffect(() => {
    async function fetchOrder() {
      const res = await axios.get(`${url}/client/order/getOrderDetails/${id}`);
      console.log("yash");
      const data = res.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        order_id: data.razorpayOrderId,
        amount: data.amount * 100,
        name: "Gigzi",
        handler: function (response) {
          window.location.href = `/success?payment_id=${response.razorpay_payment_id}&order_id=${response.razorpay_order_id}&signature=${response.razorpay_signature}`;
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    }

    fetchOrder();
  }, [orderId]);

  return (
    <div>
      <p>Loading Payment.....</p>
    </div>
  );
}

export default Pay;
