const { body } = require("express-validator");

const userCreateValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("O nome é obrigatório.")
      .isLength({ min: 3 })
      .withMessage("Minimo 3 caracteres"),
    body("email")
      .isString()
      .withMessage("O e-mail é obrigatório.")
      .isEmail()
      .withMessage("Insira um e-mail válido."),
    body("password")
    .isString()
    .withMessage("A senha é obrigatória.")
    .isLength({ min: 5 })
    .withMessage("A senha deve conter no mínimo 5 caracteres"),
    body("confirmpassword")
    .isString()
    .withMessage("Confirme a senha.")
    .custom((value, {req}) => {
      if (value != req.body.password) {
        throw new Error("As senhas não coincidem.")
      }
      return true
    })
  ];
};

module.exports = {
  userCreateValidation,
};
