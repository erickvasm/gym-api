import Joi from 'joi';

export default () => ({
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  secret: process.env.JWT_SECRET,
  nodeEnv: process.env.NODE_ENV || 'development',
  database: process.env.DATABASE_URL,
});

export const validationSchema = Joi.object({
  PORT: Joi.number().default(3000),
  JWT_SECRET: Joi.string().required(),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  DATABASE_URL: Joi.string().required(),
});
