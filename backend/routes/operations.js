// backend/routes/operations.js
const express = require('express');
const router = express.Router();
const db = require('../index').db;

// Get all operations
router.get('/', (req, res) => {
    db.query('SELECT * FROM operations', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Add a new operation
router.post('/', (req, res) => {
    const { type, client_id, vehicle_id, date } = req.body;
    db.query('INSERT INTO operations (type, client_id, vehicle_id, date) VALUES (?, ?, ?, ?)', [type, client_id, vehicle_id, date], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, type, client_id, vehicle_id, date });
    });
});

// Update an operation
router.put('/:id', (req, res) => {
    const { type, client_id, vehicle_id, date } = req.body;
    const { id } = req.params;
    db.query('UPDATE operations SET type = ?, client_id = ?, vehicle_id = ?, date = ? WHERE id = ?', [type, client_id, vehicle_id, date, id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id, type, client_id, vehicle_id, date });
    });
});

// Delete an operation
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM operations WHERE id = ?', [id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(204).end();
    });
});

module.exports = router;
