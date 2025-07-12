const { validationResult } = require('express-validator');
const Product = require('../models/Product');

// GET all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};

// GET product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product' });
  }
};

// POST create a product
exports.createProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create product' });
  }
};

// PUT update product
exports.updateProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error updating product' });
  }
};

// DELETE product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product' });
  }
};

// PATCH: Sell product (decrease stock & record sale)
exports.sellProduct = async (req, res) => {
  try {
    const { qty } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (product.stock < qty) {
      return res.status(400).json({ message: 'Not enough stock to sell' });
    }

    product.stock -= qty;
    product.salesHistory.push({ qty, date: new Date() });
    await product.save();

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error during sale', error: err.message });
  }
};

// PATCH: Purchase product (increase stock & record purchase)
exports.purchaseProduct = async (req, res) => {
  try {
    const { qty } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    product.stock += qty;
    product.purchaseHistory.push({ qty, date: new Date() });
    await product.save();

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error during purchase', error: err.message });
  }
};