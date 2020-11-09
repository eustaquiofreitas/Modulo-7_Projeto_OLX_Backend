const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const modelschema = new mongoose.Schema({
  name: String,
  idUser: String,
  state: String,
  category: String,
  images: [Object],
  dateCreated: Date,
  title: String,
  price: String,
  priceNegotiable: String,
  description: String,
  views: String,
  status: String,
});

const modelName = "Admin";

if (mongoose.connection && mongoose.connection.models[modelName]) {
  module.exports = mongoose.connection.models[modelName];
} else {
  module.exports = mongoose.model(modelName, modelschema);
}
