// backend/routes/purchase_operations.js
const express = require('express');
const router = express.Router();
const db = require('../index').db;

// Get all purchase operations
router.get('/', (req, res) => {
    db.query('SELECT * FROM purchase_operations', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Add a new purchase operation
router.post('/', (req, res) => {
    const { number, date, client_id, seller_id, vehicle_id, value } = req.body;
    db.query('INSERT INTO purchase_operations (number, date, client_id, seller_id, vehicle_id, value) VALUES (?, ?, ?, ?, ?, ?)', [number, date, client_id, seller_id, vehicle_id, value], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, number, date, client_id, seller_id, vehicle_id, value });
    });
});

// Update a purchase operation
router.put('/:id', (req, res) => {
    const { number, date, client_id, seller_id, vehicle_id, value } = req.body;
    const { id } = req.params;
    db.query('UPDATE purchase_operations SET number = ?, date = ?, client_id = ?, seller_id = ?, vehicle_id = ?, value = ? WHERE id = ?', [number, date, client_id, seller_id, vehicle_id, value, id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id, number, date, client_id, seller_id, vehicle_id, value });
    });
});

// Delete a purchase operation
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM purchase_operations WHERE id = ?', [id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(204).end();
    });
});

module.exports = router;
