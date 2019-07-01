const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const CartItemSchema = new mongoose.Schema(
    {
        product: { type: ObjectId, ref: "Product" },
        name: String,
        price: Number,
        count: Number
    },
    { timestamps: true }
);

module.exports = mongoose.model("CartItem", CartItemSchema);