const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
  name: String,
  email: String,
  states: String,
  passwordHash: String,
  token: String,
});

const modelName = "User";

if (mongoose.connection && mongoose.connection.model[modelName]) {
  module.exports = mongoose.connection.model[modelName];
} else {
  module.exports = mongoose.model(modelName, modelSchema);
}
