const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');


// Validators
const productValidation = [
  body('name', 'Product name is required').notEmpty(),
  body('stock', 'Stock must be a non-negative number').isInt({ min: 0 }),
  body('price', 'Price must be a positive number').isFloat({ min: 0 }),
  body('department', 'Department is required').notEmpty(),
];

// Routes
router.get('/', protect, getAllProducts);
router.get('/:id', protect, getProductById);
router.post('/', protect, productValidation, createProduct);
router.put('/:id', protect, productValidation, updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;
