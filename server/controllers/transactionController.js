const { validationResult } = require('express-validator');
const Transaction = require('../models/Transaction');
const Product = require('../models/Product');

// POST: Create transaction (sale or purchase)
exports.createTransaction = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { productId, type, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (type === 'sale') {
      if (product.stock < quantity) {
        return res.status(400).json({ message: 'Not enough stock' });
      }
      product.stock -= quantity;
      product.salesHistory.push({ qty: quantity, date: new Date() });
    } else {
      product.stock += quantity;
      product.purchaseHistory.push({ qty: quantity, date: new Date() });
    }

    await product.save();

    const transaction = await Transaction.create({
      productId,
      type,
      quantity
    });

    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create transaction' });
  }
};

// GET: All transactions
exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate('productId', 'name department');
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching transactions' });
  }
};

// GET: Transactions by product ID
exports.getTransactionsByProduct = async (req, res) => {
  try {
    const transactions = await Transaction.find({ productId: req.params.productId });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product transactions' });
  }
};
