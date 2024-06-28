const Product = require('../models/product');

const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

const getProductByName = async (req, res) => {
  try {
    const product = await Product.findOne({ name: req.query.name });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const addProduct = async (req, res) => {
  const { name, description, price, countInStock } = req.body;
  const product = new Product({ name, description, price, countInStock });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

const updateProduct = async (req, res) => {
  try {
    const { name, description, price, countInStock } = req.body;
    const product = await Product.findOne({ name: req.params.name });

    if (product) {
      product.name = name ?? product.name;
      product.description = description ?? product.description;
      product.price = price ?? product.price;
      product.countInStock = countInStock ?? product.countInStock;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ name: req.params.name });

    if (product) {
      await Product.deleteOne({ _id: product._id });
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getProducts,
  getProductByName,
  addProduct,
  updateProduct,
  deleteProduct,
};
