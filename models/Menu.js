const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MenuSchema = new Schema({
  menu: String,
  category: String,
});

module.exports = mongoose.model("Menu", MenuSchema);
