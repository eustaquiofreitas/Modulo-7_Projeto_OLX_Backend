const { checkSchema } = require("express-validator");

module.exports = {
  signup: checkSchema({
    name: {
      trim: true,
      isLength: {
        options: { min: 4 },
      },
      errorMessage: "Nome deve conter no mínimo 4 caracteres.",
    },
    email: {
      isEmail: true,
      normalizeEmail: true,
      errorMessage: "E-mail inválido.",
    },
    password: {
      isLength: {
        options: { min: 4 },
      },
      errorMessage: "Senha deve conter no mínimo 4 caracteres.",
    },
    state: {
      notEmpty: true,
      errorMessage: "Estado não preenchido.",
    },
  }),
  signin: checkSchema({
    email: {
      isEmail: true,
      normalizeEmail: true,
      errorMessage: "E-mail inválido",
    },
    password: {
      isLength: 4,
      options: { min: 4 },
    },
    errorMessage: "Senha deve conter no mínimo 4 caracteres.",
  }),
};
