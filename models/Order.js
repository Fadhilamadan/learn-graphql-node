const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  invoice: String,
  quantity: Number,
  menu_id: String,
});

module.exports = mongoose.model("Order", OrderSchema);
