import Product from '../models/Product.js';

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        if(products) {
            res.status(200).json(products);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
}

const getProductByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const products = await Product.find({ category: category });
        if(!products.length) {
            res.status(404).json({ message: 'No product found in this category' });
        }
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send({ message: 'Server Error', error: error.message });
    }
}

export {
  getProducts,
  getProductByCategory,
};
