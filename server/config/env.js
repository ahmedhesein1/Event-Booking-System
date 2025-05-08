import dotenv from "dotenv";
import Joi from "joi";

dotenv.config();

const envSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid("development", "production")
    .default("development"),
  MONGODB_URI: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
}).unknown();

const { error, value } = envSchema.validate(process.env);

if (error) throw new Error(`Env validation error: ${error.message}`);

export default {
  env: value.NODE_ENV,
  mongoose: {
    uri: value.MONGODB_URI + (value.NODE_ENV === "test" ? "-test" : ""),
  },
  jwt: {
    secret: value.JWT_SECRET,
  },
};
