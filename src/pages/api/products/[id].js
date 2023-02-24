const Product = require('@/models/product');

export default async function Handler (req, res) {
    if (req.method === 'GET') {
        try {
            const product = await Product.findById(req.query.id);
            return res.status(200).json(product);
        } catch (e) {
            return res.status(400).json({err: e});
        }
    } else {
        return res.status(401).json({err: 'metodo no soportado'})
    }
}