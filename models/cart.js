const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      productName: { type: String, ref: 'Product' },
      quantity: { type: Number, default: 1 },
    },
  ],
});

module.exports = mongoose.models.Cart || mongoose.model('Cart', cartSchema);