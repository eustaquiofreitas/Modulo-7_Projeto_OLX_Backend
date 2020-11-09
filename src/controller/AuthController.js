const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { validationResult, matchedData } = require("express-validator");
const User = require("../models/User");
const State = require("../models/State");

module.exports = {
  signin: async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      response.json({ error: errors.mapped() });
      return;
    }
    const data = matchedData(request);

    const user = await User.findOne({ email: data.email });
    if (!user) {
      response.json({ error: "E-mail e/ou senha invalidos." });
      return;
    }
    const match = await bcrypt.compare(data.password, user.passwordHash);
    if (!match) {
      response.json({ error: "E-mail e/ou senha invalidos." });
      return;
    }

    const payload = (Date.now() + Math.random()).toString();

    use.token = token;
    await use.save();

    response.json({ token, email: data.email });
  },
  signup: async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      response.json({ errors: errors.mapped() });
      return;
    }
    const data = matchedData(request);

    const user = await User.findOne({ email: data.email });
    if (user) {
      response.json({
        error: { email: { msg: "E-mail já existente." } },
      });
      return;
    }

    if (mongoose.Types.ObjectId.isValid(data.state)) {
      const stateItem = await State.findById(data.state);

      if (!stateItem) {
        response.json({ error: { msg: "Estado não existe." } });
        return;
      }
    } else {
      response.json({ error: { msg: "Código de estado inválido." } });
      return;
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const payload = (Date.now() + Math.random()).toString();
    const token = await bcrypt.hash(payload, 10);

    const newUser = new User({
      name: data.name,
      email: data.email,
      passwordHash,
      token,
      state: data.state,
    });

    await newUser.save();

    response.json({ token });
  },
};
