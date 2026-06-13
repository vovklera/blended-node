import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from '../controlles/productControlles.js';
import { celebrate } from 'celebrate';
import {
  createProductsShema,
  getProductsShema,
  productIdParamShema,
  updateProductsShema,
} from '../validation/productsValidation.js';

const router = Router();

router.get('/products', celebrate(getProductsShema), getAllProducts);
router.get(
  '/products/:productId',
  celebrate(productIdParamShema),
  getProductById,
);
router.post('/products', celebrate(createProductsShema), createProduct);
router.delete(
  '/products/:productId',
  celebrate(productIdParamShema),
  deleteProduct,
);
router.patch(
  '/products/:productId',
  celebrate(updateProductsShema),
  updateProduct,
);

export default router;
