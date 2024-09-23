// backend/routes/orders.js
const express = require('express');
const router = express.Router();
const db = require('../index').db;

// Get all orders
router.get('/', (req, res) => {
    db.query('SELECT * FROM orders', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Add a new order
router.post('/', (req, res) => {
    const { number, date, client_id, seller_id, manufacturer_id, model, year, color, accessories, value } = req.body;
    db.query('INSERT INTO orders (number, date, client_id, seller_id, manufacturer_id, model, year, color, accessories, value) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [number, date, client_id, seller_id, manufacturer_id, model, year, color, accessories, value], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: results.insertId, number, date, client_id, seller_id, manufacturer_id, model, year, color, accessories, value });
    });
});

// Update an order
router.put('/:id', (req, res) => {
    const { number, date, client_id, seller_id, manufacturer_id, model, year, color, accessories, value } = req.body;
    const { id } = req.params;
    db.query('UPDATE orders SET number = ?, date = ?, client_id = ?, seller_id = ?, manufacturer_id = ?, model = ?, year = ?, color = ?, accessories = ?, value = ? WHERE id = ?', [number, date, client_id, seller_id, manufacturer_id, model, year, color, accessories, value, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id, number, date, client_id, seller_id, manufacturer_id, model, year, color, accessories, value });
    });
});

// Delete an order
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM orders WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(204).end();
    });
});

module.exports = router;
