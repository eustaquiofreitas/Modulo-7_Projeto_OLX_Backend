const { checkSchema } = require("express-validator");

module.exports = {
  editAction: checkSchema({
    token: {
      notEmpty: true,
    },
    name: {
      optional: true,
      trim: true,
      isLength: {
        options: { min: 4 },
      },
      errorMessage: "Nome deve conter no mínimo 4 caracteres.",
    },
    email: {
      optional: true,
      isEmail: true,
      normalizeEmail: true,
      errorMessage: "E-mail inválido.",
    },
    password: {
      optional: true,
      isLength: {
        options: { min: 4 },
      },
      errorMessage: "Senha deve conter no mínimo 4 caracteres.",
    },
    state: {
      optional: true,
      notEmpty: true,
      errorMessage: "Estado não preenchido.",
    },
  }),
};
