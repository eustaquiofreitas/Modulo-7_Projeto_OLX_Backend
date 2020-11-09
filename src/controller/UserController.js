const { validationResult, matchedData } = require("express-validator");
const State = require("../models/State");
const User = require("../models/User");
const Category = require("../models/Category");
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

module.exports = {
  getStates: async (request, response) => {
    await State.find()
      .then((states) => {
        response.json({ states });
      })
      .catch((err) => {
        response.json({ err });
      });
  },
  info: async (request, response) => {
    let token = request.query.token;

    const user = await User.findOne({ token });
    const state = await State.findById(user.state);
    const admin = await Admin.find({ idUser: user._id.toString() });

    let adminList = [];
    for (let i in admin) {
      const cat = await Category.findById(admin[i].category);
      // adminList.push({
      //   id: admin[i]._id,
      //   title: admin[i].title,
      //   status: admin[i].status,
      //   images: admin[i].images,
      //   dateCreated: admin[i].dateCreated,
      //   price: admin[i].price,
      //   priceNegotiable: admin[i].priceNegotiable,
      //   description: admin[i].description,
      //   view: admin[i].view,
      //   category: cat.slug,
      // });

      adminList.push({ ...admin[i], category: cat.slug });
    }
    response.json({
      name: user.name,
      email: user.email,
      // state: data.name,
      admin: adminList,
    });
  },
  editAction: async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      response.json({ error: errors.mapped() });
      return;
    }
    const data = matchedData(request);

    let updates = {};
    if (data.name) {
      updates.name = data.name;
    }
    if (data.email) {
      const emailCheck = await User.findOne({ email: data.email });
      if (emailCheck) {
        response.json({ error: "E-mail já existente." });
        return;
      }
      updates.email = data.email;
    }
    if (data.state) {
      if (Mongoose.Types.Object.isValid(data.state)) {
        const checkState = await State.findOne({ state: data.state });
        if (!checkState) {
          response.json({ error: "Estado existente." });
          return;
        }
        updates.state = data.state;
      } else {
        response.json({ error: "Codigo invalido." });
        return;
      }
    }

    if (data.passwordHash) {
      updates.passwordHash = await bcrypt.hash(data.passwordHash, 10);
    }

    await User.findOneAndUpdate({ token: data.token }, { $set: updates });
    response.json({ Status: true });
  },
};
