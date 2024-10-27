import { createRequire } from "module";
const require = createRequire(import.meta.url);

const express = require("express");
const bodyparser = require("body-parser");
const uuid = require("uuid").v4;
const cors = require("cors");
const PdfParse = require("pdf-parse");
const OpenAI = require("openai");
const { createClient } = require("@supabase/supabase-js");
// const { default: payment_router } = require("./Controllers/Stripe");

// const { config } = require("dotenv");
// config();

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// import express from "express";
// import bodyparser from "body-parser";
// import { v4 as uuid } from "uuid";
// import cors from "cors";
// import PdfParse from "pdf-parse";
// import OpenAI from "openai";
// import { createClient } from "@supabase/supabase-js";
import payment_router from "./Controllers/Stripe.js";

import { config } from "dotenv";
config();

import Stripe from "stripe";
import { log } from "console";
const stripe = new Stripe(
  "sk_test_51NzduCChmFSf0SILqtfTq7q8MfF05ib7aismZbnnV807FNIXK9lt6IIDZHxigjG2WShL4jRlCZq9js3o4E22MFZG000rzCHAWe"
);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
app.use(cors());
app.use(
  bodyparser.urlencoded({
    extended: true,
    limit: "35mb",
    parameterLimit: 50000,
  })
);

app.use(express.raw({ type: "application/pdf", limit: "10mb" }));

const PORT = process.env.PORT || 3001;
const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_KEY;
const supabase = createClient(url, key);

const endpointSecret =
  "whsec_06c4171f7ffecc7bd817ce52314ab33f4215e8e856b35d691f69e06c93518e74";

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;
    // console.log("ss");

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const CustomerPaymentCreated = event.data.object;
        // console.log(CustomerPaymentCreated);
        const price = CustomerPaymentCreated?.amount / 100;
        const { data: PlanData, error: plan_err } = await supabase
          .from("plans")
          .select("*")
          .eq("price", price)
          .single();

        const { data: CustomerInfo, error: cust_err } = await supabase
          .from("UserData")
          .select("*")
          .eq("stripe_customer_id", CustomerPaymentCreated.customer)
          .single();

        if (cust_err) {
          return "User Does not Exist";
        }

        if (PlanData.plan_id == 2) {
          console.log("One Time Analysis");
          await supabase
            .from("UserData")
            .update({
              plan: PlanData.plan_id,
              OneTime_Analysis: 1,
            })
            .eq("stripe_customer_id", CustomerPaymentCreated.customer);
        } else if (PlanData.plan_id == 3) {
          console.log("One Time Writing");
          await supabase
            .from("UserData")
            .update({
              plan: PlanData.plan_id,
              OneTime_Writing: 1,
            })
            .eq("stripe_customer_id", CustomerPaymentCreated.customer);
        }

        console.log("Payment Succeeded");
      break;
      case "customer.subscription.created":
        const CustomerSubscriptionCreated = event.data.object;
        console.log(CustomerSubscriptionCreated);
        if (CustomerSubscriptionCreated.status == "active") {
          const plan = CustomerSubscriptionCreated.plan;
          console.log(plan.active ? plan.product : "No Plan Active Currently");

          const { data: PlanData, error: plan_err } = await supabase
            .from("plans")
            .select("*")
            .eq("stripe_id", plan.product)
            .single();

          const { data: CustomerInfo, error: cust_err } = await supabase
            .from("UserData")
            .select("*")
            .eq("stripe_customer_id", CustomerSubscriptionCreated.customer)
            .single();

          if (cust_err) {
            return "User Does not Exist";
          }

          await supabase
            .from("UserData")
            .update({
              plan: PlanData.plan_id,
              Subscription_Analysis: 1,
            })
            .eq("stripe_customer_id", CustomerSubscriptionCreated.customer);
        }

        console.log("The Customer Subscription is Created.");
        break;

      case "customer.subscription.updated":
        const CustomerSubscriptionUpdated = event.data.object;
        console.log(CustomerSubscriptionUpdated);
        if (CustomerSubscriptionUpdated.status == "active") {
          const plan = CustomerSubscriptionUpdated.plan;
          console.log(plan.active ? plan.product : "No Plan Active Currently");

          const { data: PlanData, error: plan_err } = await supabase
            .from("plans")
            .select("*")
            .eq("stripe_id", plan.product)
            .single();

          const { data: CustomerInfo, error: cust_err } = await supabase
            .from("UserData")
            .select("*")
            .eq("stripe_customer_id", CustomerSubscriptionUpdated.customer)
            .single();

          if (cust_err) {
            return "User Does not Exist";
          }

          await supabase
            .from("UserData")
            .update({
              plan: PlanData.plan_id,
              Subscription_Analysis: 1,
            })
            .eq("stripe_customer_id", CustomerSubscriptionUpdated.customer);
        }

        console.log("The Customer Subscription is Updated.");
        break;

      case "customer.subscription.deleted":
        const customerSubscriptionDeleted = event.data.object;
        console.log("The Customer Subscription is Deleted.");
        console.log(customerSubscriptionDeleted.customer);
        await supabase
          .from("UserData")
          .update({
            plan: null,
            Subscription_Analysis: 0,
          })
          .eq("stripe_customer_id", customerSubscriptionDeleted.customer);
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    response.status(200).send();
  }
);

app.use(bodyparser.json());
app.use(express.json());

// app.post(
//   "/webhook",
//   bodyparser.raw({ type: "application/json" }),
//   async (req, res) => {
//     console.log("Webhook Activated");

//     const signature = req.headers["stripe-signature"];
//     const secret = process.env.STRIPE_SIGNING_SECRET;
//     let event;

//     try {
//       event = Stripe.webhooks.constructEvent(req, signature, secret);
//     } catch (error) {
//       console.log("error:" + error);
//       res.json({ success: false });
//     }

//     console.log(event);
//     res.json({ success: true });
//   }
// );

app.post("/chat", async (req, res) => {
  const { chatarr } = req.body;

  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: chatarr,
  });
  res.status(200).json({ text: chatCompletion.choices[0].message });
});

app.post("/payment", async (req, res) => {
  console.log("REQUEST BODY:" + req.body);

  let error, status;

  try {
    const { token, product } = req.body;

    const customer = await Stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const key = uuid();

    const charge = await Stripe.charges.create(
      {
        amount: product.price * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased the ${product.name}`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip,
          },
        },
      },
      {
        idempotencyKey: key,
      }
    );

    console.log("CHARGE:" + { charge });
    status = "success";
    res.status(200).json({ status: status });
  } catch (error) {
    console.log("ERROR:" + error);
    status = "failure";
    res.status(500).json({ status: status });
  }
});

app.post("/pdfParser", async (req, res) => {
  try {
    const pdfData = req.body;
    const pdfText = await parsePDFText(pdfData);

    res.status(200).json({ text: pdfText });
  } catch (error) {
    console.error("Error sending PDF:", error);
    res.status(500).send("Error sending PDF");
  }
});

async function parsePDFText(pdfData) {
  try {
    const pdfText = await PdfParse(pdfData);
    return pdfText.text;
  } catch (error) {
    throw error;
  }
}

app.post("/create-checkout-session", async (req, res) => {
  const priceID = req.body.priceID;

  const session = await Stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceID,
        quantity: 1,
      },
    ],
    success_url: "http://localhost:5173/upload",
    cancel_url: "http://localhost:5173/",
  });
  res.send({ id: session.id });
});

app.post("/AddUser", async (req, res) => {
  const Email = req.body.Email;
  const { d, e } = await supabase.from("UserData").insert({ Email: Email });
  if (e) {
    res.status(500).json({ status: "failure", error: e });
  } else {
    res.status(200).json({ status: "success", data: d });
  }
});

app.post("/FetchUsers", async (req, res) => {
  const Email = req.body.Email;

  const { data, error } = await supabase
    .from("UserData")
    .select()
    .eq("Email", Email);

  if (error) {
    res.status(500).json({ status: "failure", error: error });
  } else {
    res.status(200).json({ status: "success", data: data });
  }
});

app.get("/FetchAllUsers", async (req, res) => {
  const { data, error } = await supabase
    .from("UserData")
    .select('*')

  if (error) {
    res.status(500).json({ status: "failure", error: error });
  } else {
    res.status(200).json({ status: "success", data: data });
  }
});

app.post("/VerifyUser", async (req, res) => {
  const Email = req.body.Email;

  const { data, error } = await supabase
    .from("UserData")
    .update({ Verified: true })
    .eq("Email", Email);

  if (error) {
    res.status(500).json({ status: "failure", error: error });
  } else {
    res.status(200).json({ status: "success", data: data });
  }
});

app.post("/OneTime_Finish", async (req, res) => {
  const Email = req.body.Email;
  try {
      const { data: customer_data, error: customer_err } = await supabase
      .from("UserData")
      .select("*")
      .eq("Email", Email)
      .single();

      if (customer_err) {
        res.status(500).json({ status: "failure", error: customer_err });
      } else {
      
      const { data, error } = await supabase
      .from("UserData")
      .update({ OneTime_Analysis: false })
      .eq("Email", Email)
      .select("*")
      .single();

      if (error) {
        res.status(500).json({ status: "failure", error: error });
      } else {
        res.status(200).json({ status: "success", data: data });
      }
    }

  } catch (err) {
    return null;
  }
});

app.post("/OneTimeWriting_Finish", async (req, res) => {
  const Email = req.body.Email;
  try {
      const { data: customer_data, error: customer_err } = await supabase
      .from("UserData")
      .select("*")
      .eq("Email", Email)
      .single();

      if (customer_err) {
        res.status(500).json({ status: "failure", error: customer_err });
      } else {
      
      const { data, error } = await supabase
      .from("UserData")
      .update({ OneTime_Writing: false })
      .eq("Email", Email)
      .select("*")
      .single();

      if (error) {
        res.status(500).json({ status: "failure", error: error });
      } else {
        console.log(data)
        res.status(200).json({ status: "success", data: data });
      }
    }

  } catch (err) {
    return null;
  }
});


app.use("/v1/api/pay", payment_router);

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
