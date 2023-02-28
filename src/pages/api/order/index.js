const orderClient = require('@/models/orderClient');

export default async function Handler (req, res) {
    if (req.method === 'GET') {
        const orders = await orderClient.find();
        return res.status(200).json(orders);
    } else if (req.method === 'POST') {
        req.body.status = 'activo';
        const newOrder = new orderClient(req.body);
        await newOrder.save();
        return res.status(201).json(newOrder);
    }
}