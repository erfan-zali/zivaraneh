import express from 'express';
import { 
    getProducts,
    getProductByCategory,
 } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.route('/')
  .get(getProducts);
productRouter.route('/category/:category')
  .get(getProductByCategory);

export default productRouter;