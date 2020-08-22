import express from "express";
import Order from "../models/orderModel";
import { isAuth } from "../util";

const router = express.Router();

router.get("/:id", async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id });
  if (order) {
    res.send(order);
  } else {
    res.status(404).send("Order not found");
  }
});

router.post("/", async (req, res) => {
  const newOrder = new Order({
    orderItems: req.body.orderItems,
    user: req.user._id,
    shipping: req.body.shipping,
    payment: req.body.payment,
    itemsPrice: req.body.itemsPrice,
    taxPrice: req.body.taxPrice,
    shippingPrice: req.body.shippingPrice,
    totalPrice: req.body.totalPrice,
  });
  const newOrderCreated = await newOrder.save();
  res.status(201).send({ message: "New Order Created", data: newOrderCreated });
});

router.put("/:id/pay", async (req, res) => {
  const order = new Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.payment = {
      paymentResult = {
        paymentMethod: 'paypal',
      payerID: req.body.payerID,
      orderID: req.body.orderID,
      paymentID: req.body.paymentID,
      }
    };
    const updatedOrder = await order.save();
    res.send({message:'prder paid' , order: updatedOrder})
  }else{
    res.status(404).send({message: 'order not found'})
  }
});

export default router;
