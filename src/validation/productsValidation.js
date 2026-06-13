import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import { CATEGORIES } from '../constanst/categories.js';

const objectIdValidator = (value, helper) => {
  return !isValidObjectId(value) ? helper.message('invalid id format') : value;
};

export const getProductsShema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().min(1).default(1).integer(),
    perPage: Joi.number().min(5).max(20).default(10).integer(),
    category: Joi.string().valid(...CATEGORIES),
    minPrice: Joi.number().positive(),
    maxPrice: Joi.number().positive(),
  }),
};

export const productIdParamShema = {
  [Segments.PARAMS]: Joi.object({
    productId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const createProductsShema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(5).max(30).required().trim(),
    price: Joi.string().required(),
    category: Joi.string()
      .valid(...CATEGORIES)
      .default('other'),
    description: Joi.string().max(300),
  }),
};

export const updateProductsShema = {
  ...productIdParamShema,
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(5).max(30).trim(),
    price: Joi.string(),
    category: Joi.string().valid(...CATEGORIES),
    description: Joi.string().max(300),
  }).min(1),
};
