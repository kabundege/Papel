import Joi from '@hapi/joi';

export default class UserValidator {
  static signup(user) {
    const schema = Joi.object().keys({
      firstname: Joi.string().required().min(3).max(40)
        .trim()
        .pattern(/^[a-zA-Z]+$/),
      lastname: Joi.string().required().min(3).max(40)
        .trim()
        .regex(/^[a-zA-Z]+$/),
      email: Joi.string().email().required().trim(),
      password: Joi.string().required().min(5).trim(),
      type:  Joi.string().trim(),
      isadmin:  Joi.boolean().strict().default(false)
    });
    return schema.validate(user, { abortEarly: false });
  }
}