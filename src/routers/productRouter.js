import express from 'express';
import { 
    getProducts,
    getProductByCategory,
    getProductsByCollection,
    getProductsBySearch,
 } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.route('/')
  .get(getProducts);
productRouter.route('/category/:category')
  .get(getProductByCategory);
productRouter.route('/collection/:collection')
  .get(getProductsByCollection);
productRouter.route('/search/:search')
  .get(getProductsBySearch);

export default productRouter;