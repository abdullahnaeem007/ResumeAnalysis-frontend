import express from "express";
import { Login } from "./Auth.js";
import { createPaymentLink } from "../Services/Stripe.js";
const payment_router = express();

payment_router.get("", (req, res) => {
  res.send("saoidj");
});

payment_router.post("", async (req, res) => {
  // const { email, succes_url, cancel_url, plan_id } = req.body;
  let { access_token, success_url, cancel_url, plan_id } = req.body;

  if (!success_url) {
    success_url = "https://www.google.com";
  }

  if (!cancel_url) {
    cancel_url = "https://www.facebook.com";
  }

  const usr = await Login(access_token);

  if (!usr?.email || !plan_id) {
    // || !cancel_url || !succes_url) {
    return res.status(400).send({
      error: "Bad Request. Require : email, succes_url, cancel_url, plan_id",
      data: null,
      status: 400,
    });
  }

  const data = await createPaymentLink(
    usr?.email,
    plan_id,
    success_url,
    cancel_url
  );
  console.log(data)
  return res.status(data?.status ? data?.status : 500).json(data);
});

export default payment_router;
