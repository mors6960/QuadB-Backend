const Cart = require('../models/Cart');
const Product = require('../models/Product');

const getCart = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user._id });
  if (cart) {
    res.json(cart);
  } else {
    res.status(404).json({ message: 'Cart not found' });
  }
};

const addToCart = async (req, res) => {
  const { productName, quantity } = req.body;
  let cart = await Cart.findOne({ userId: req.user._id });

  if (!cart) {
    cart = new Cart({ userId: req.user._id, products: [] });
  }

  const productIndex = cart.products.findIndex(p => p.productName === productName);
  if (productIndex > -1) {
    cart.products[productIndex].quantity += quantity;
  } else {
    const product = await Product.findOne({ name: productName });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    cart.products.push({ productName, quantity });
  }

  const updatedCart = await cart.save();
  res.status(201).json(updatedCart);
};

const removeFromCart = async (req, res) => {
  const { productName } = req.params;
  const cart = await Cart.findOne({ userId: req.user._id });

  if (cart) {
    cart.products = cart.products.filter(p => p.productName !== productName);
    const updatedCart = await cart.save();
    res.json(updatedCart);
  } else {
    res.status(404).json({ message: 'Cart not found' });
  }
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
};
