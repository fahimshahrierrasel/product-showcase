import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
  getAdminProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController';

const router = Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.get('/admin/all', getAdminProducts);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
