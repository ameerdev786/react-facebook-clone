const express = require("express");
const Cart = require("../model/cart");

exports.addItemsToCart = async (req, res) => {
  const { product, quantity, price } = req.body.cartItems;
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
      //find if cart is exist for specific user
      let item = cart.cartItems.findIndex((p) => p.product == product);
      if (item > -1) {
        // increase quanitiy of product if already added
        cart.cartItems[item].quantity = cart.cartItems[item].quantity + quantity;
      } else {
        //product does not exists in cart, add new item
        cart.cartItems.push({ product, quantity, price });
      }
      cart = await cart.save();
      return res.status(201).json({ cart });
    } else {
      //no cart for user, create new cart
      const newCart = await Cart.create({
        user: req.user._id,
        cartItems: [{ product, quantity, price }],
      });
      return res.status(201).json({ newCart });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};
