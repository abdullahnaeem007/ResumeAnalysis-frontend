import { config } from "dotenv";
config();

import { supabase } from "../supabase.js";

import stripe from "stripe";
const Stripe = stripe(process.env.STRIPE_SECRET_KEY);

export const getStipeCustomer = async (email) => {
  try {
    const { data: customer_data, error: customer_err } = await supabase
      .from("UserData")
      .select("*")
      .eq("Email", email)
      .single();

    if (!customer_err && customer_data.stripe_customer_id) {
      return customer_data;
    }

    const customer = await Stripe.customers.create({
      email: email,
      name: customer_data.name,
    });

    const { data, error } = await supabase
      .from("UserData")
      .update({ stripe_customer_id: customer.id })
      .eq("Email", email)
      .select("*")
      .single();

    return data;
  } catch (err) {
    return null;
  }
};

export const getStipeProduct = async (plan_id) => {
  try {
    const { data: plan_data, error: plan_err } = await supabase
      .from("plans")
      .select("*")
      .eq("plan_id", plan_id)
      .single();

    if (!plan_err && plan_data.stripe_id != null) {
      return plan_data;
    }

    const data = await Stripe.products.create({
      name: plan_data.name,
      default_price_data: {
        unit_amount: parseInt(plan_data.price * 100),
        currency: "usd",
        recurring: {
          interval: "month",
        },
      },
      description: "Level up Your Skills with BakedBot ",
    });

    let { data: plans_data, error: plans_err } = await supabase
      .from("plans")
      .update({ stripe_id: data.id, price_id: data.default_price })
      .eq("plan_id", plan_id)
      .select("*")
      .single();
    if (plans_err) {
      return null;
    }

    return plans_data;
  } catch (err) {
    console.log(err);
  }
  return null;
};

export const createPaymentLink = async (
  email,
  plan_id,
  success_url,
  cancel_url
) => {
  try {
    let customer = await getStipeCustomer(email);
    let product = await getStipeProduct(plan_id);

    console.log(customer, product);
    if (customer?.stripe_customer_id == null || product?.stripe_id == null) {
      return {
        err: "Input Parameters Missing. No Plan or Customer Provided....",
        data: null,
        status: 401,
      };
    }

    let session;

    if (plan_id !== 1) {
      session = await Stripe.checkout.sessions.create({
        success_url: success_url,
        cancel_url: cancel_url,
        customer: customer.stripe_customer_id,
        // allow_promotion_codes: true,
        line_items: [
          {
            price: product.price_id,
            quantity: 1,
          },
        ],
        mode: "payment",
      });
    } else {
      session = await Stripe.checkout.sessions.create({
        success_url: success_url,
        cancel_url: cancel_url,
        customer: customer.stripe_customer_id,
        // allow_promotion_codes: true,
        line_items: [
          {
            price: product.price_id,
            quantity: 1,
          },
        ],

        mode: "subscription",
      });
    }
    return {
      err: null,
      data: session.url,
      status: 200,
    };
  } catch (err) {
    console.log(err);

    return {
      status: 500,
      err: err.message,
      data: null,
    };
  }
};
