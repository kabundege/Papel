import Joi from '@hapi/joi';

export default class UserValidator {
  static admin(user) {
    const schema = Joi.object().keys({
      firstName: Joi.string().required().trim().error(new Error("Enter the firstname")),
      lastName: Joi.string().required().trim().error(new Error("Enter the LastName")),
      email: Joi.string().email().required().trim().error(new Error("Email must be valid")),
      password: Joi.string().required().min(5).trim().error(new Error("Enter the password")),
      confirmPassword: Joi.string().required().min(5).trim().error(new Error("Enter the confirm password")),
      type:  Joi.string().trim().required().default('client').error(new Error("Enter specify the account type")),
      isadmin:  Joi.boolean().strict().required().default(false).error(new Error("Enter the admin createria"))
    });
    return schema.validate(user, { abortEarly: false });
  }

  static signup(user) {
    const schema = Joi.object().keys({
      firstName: Joi.string().required().trim().error(new Error("Enter the firstName")),
      lastName: Joi.string().required().trim().error(new Error("Enter the LastName")),
      email: Joi.string().email().required().trim().error(new Error("Email must be valid")),
      password: Joi.string().required().min(5).trim().error(new Error("Enter the password")),
      confirmPassword: Joi.string().required().min(5).trim().error(new Error("Enter the confirm password"))
    });
    return schema.validate(user, { abortEarly: false });
  }

  static signin(user) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required().trim().error(new Error("Email must be valid")),
      password: Joi.string().required().min(5).trim().error(new Error("Enter the password")),
    });
    return schema.validate(user, { abortEarly: false });
  }

  static email(user) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required().trim().error(new Error("Email must be valid"))
    });
    return schema.validate(user, { abortEarly: false });
  }

  static reset(user) {
    const schema = Joi.object().keys({
      password: Joi.string().required().min(5).trim().error(new Error("Enter the password")),
      confirmPassword: Joi.string().required().min(5).trim().error(new Error("Enter the confirm password"))
    });
    return schema.validate(user, { abortEarly: false });
  }

  static createAcc(user) {
    const schema = Joi.object().keys({
      type: Joi.string().required().trim().error(new Error('Enter The Account Type'))
    });
    return schema.validate(user, { abortEarly: false });
  }

  static status(user) {
    const schema = Joi.object().keys({
      status: Joi.string().required().trim()
    });
    return schema.validate(user, { abortEarly: false });
  }

  static trans(user) {
    const schema = Joi.object().keys({
    amount: Joi.number().min(1).required()
    });
    return schema.validate(user, { abortEarly: false });
  }
  
}