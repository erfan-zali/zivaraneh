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

const getProductsByCollection = async (req, res) => {
  try {
    const { collection } = req.params;
    const products = await Product.find({ col: collection });

    if (!products.length) {
      return res
        .status(404)
        .json({ message: "No products found in this collection" });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getProductsBySearch = async (req, res) => {
    try {
        const searchTerm = req.params.search;
        const products = await Product.find({
            $text: {
                $search: searchTerm
            }
        })
        if(!products.length) {
            res.status(404).send({ message: 'Product not found' });
        }
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send({ message: 'Server Error', error: error.message });
    }
}

export { 
    getProducts,
    getProductByCategory,
    getProductsByCollection,
    getProductsBySearch
 };