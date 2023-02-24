const Product = require('@/models/product');

export default async function Handler (req, res) {
    if (req.method === 'POST') {
        const products = await Product.find({category: req.body.category});
        return res.status(200).json(products);
    } else {
        return res.status(401).json({err: 'metodo no soportado'})
    }
}