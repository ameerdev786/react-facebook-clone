const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" ,required:true},
    cartItems: [
         {
          quantity: { type: Number, default: 1 },
          product: {type: mongoose.Schema.Types.ObjectId,ref: "Product", required: true, },
         price: { type: String},
       
      },
    ], 
  },
  { timestamps: true }
)

module.exports = mongoose.model("Cart", cartSchema);
