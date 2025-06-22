const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  price: {
    type: Number,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  salesHistory: [
    {
      qty: Number,
      date: Date
    }
  ],
  purchaseHistory: [
    {
      qty: Number,
      date: Date
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
