const express = require('express');
const { body, param } = require('express-validator');
const {
  createTransaction,
  getAllTransactions,
  getTransactionsByProduct
} = require('../controllers/transactionController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Transaction validation middleware
const transactionValidation = [
  body('productId', 'Product ID is required').notEmpty(),
  body('type', 'Type must be "sale" or "purchase"').isIn(['sale', 'purchase']),
  body('quantity', 'Quantity must be a positive integer').isInt({ min: 1 })
];

// Routes
router.post('/', protect, transactionValidation, createTransaction);
router.get('/', protect, getAllTransactions);
router.get('/:productId', protect, getTransactionsByProduct);

module.exports = router;
