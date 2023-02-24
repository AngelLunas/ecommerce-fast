import { dbConnect } from "@/utils/mongoose";
const Product = require('@/models/product');

dbConnect();

export default async function Handler (req, res) {
    if (req.method === 'GET') {
        const products = await Product.find();
        return res.status(200).json(products);
    } else if (req.method === 'POST') {
        const newProduct = new Product(req.body);
        await newProduct.save();
        return res.status(201).json(newProduct);
    } else if (req.method === 'DELETE') {
        await Product.deleteMany({});
        return res.status(200).json('sucesfull');
    }
}