import { Validator } from "jsonschema";

const validator = new Validator();

const schemaValidator = (schema) => {
  return (req, res, next) => {
    const validate = validator.validate(req.body, schema);
    const errors = [];

    if (!validate.valid) {
      validate.errors.forEach((e) => {
        errors.push(e.message.replace(/\"/, ""));
      });
      return res.status(500).json({ errors });
    }
    next();
  };
};

export { schemaValidator };
