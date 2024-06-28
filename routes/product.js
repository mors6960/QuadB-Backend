const express = require('express');
const {
  getProducts,
  getProductByName,
  addProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/auth');
const router = express.Router();

router.get('/', getProducts);
router.get('/name', getProductByName);
router.post('/', protect, admin, addProduct);
router.put('/:name', protect, admin, updateProduct);
router.delete('/:name', protect, admin, deleteProduct);

module.exports = router;
