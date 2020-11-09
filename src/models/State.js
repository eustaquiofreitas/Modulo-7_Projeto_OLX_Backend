const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const modelschema = new mongoose.Schema({
  name: String,
});

const modelName = "States";

if (mongoose.connection && mongoose.connection.models[modelName]) {
  module.exports = mongoose.connection.models[modelName];
} else {
  module.exports = mongoose.model(modelName, modelschema);
}
