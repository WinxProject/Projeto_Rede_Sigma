// backend/routes/sale_operations.js
const express = require('express');
const router = express.Router();
const db = require('../index').db;

// Get all sale operations
router.get('/', (req, res) => {
    db.query('SELECT * FROM sale_operations', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Add a new sale operation
router.post('/', (req, res) => {
    const { number, date, client_id, seller_id, vehicle_id, down_payment, financed_amount, total_value } = req.body;
    db.query('INSERT INTO sale_operations (number, date, client_id, seller_id, vehicle_id, down_payment, financed_amount, total_value) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [number, date, client_id, seller_id, vehicle_id, down_payment, financed_amount, total_value], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, number, date, client_id, seller_id, vehicle_id, down_payment, financed_amount, total_value });
    });
});

// Update a sale operation
router.put('/:id', (req, res) => {
    const { number, date, client_id, seller_id, vehicle_id, down_payment, financed_amount, total_value } = req.body;
    const { id } = req.params;
    db.query('UPDATE sale_operations SET number = ?, date = ?, client_id = ?, seller_id = ?, vehicle_id = ?, down_payment = ?, financed_amount = ?, total_value = ? WHERE id = ?', [number, date, client_id, seller_id, vehicle_id, down_payment, financed_amount, total_value, id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id, number, date, client_id, seller_id, vehicle_id, down_payment, financed_amount, total_value });
    });
});

// Delete a sale operation
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM sale_operations WHERE id = ?', [id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(204).end();
    });
});

module.exports = router;
