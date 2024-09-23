// backend/routes/sellers.js
const express = require('express');
const router = express.Router();
const db = require('../index').db;

// Get all sellers
router.get('/', (req, res) => {
    db.query('SELECT * FROM sellers', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Add a new seller
router.post('/', (req, res) => {
    const { code, username } = req.body;
    db.query('INSERT INTO sellers (code, username) VALUES (?, ?)', [code, username], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: results.insertId, code, username });
    });
});

// Update a seller
router.put('/:id', (req, res) => {
    const { code, username } = req.body;
    const { id } = req.params;
    db.query('UPDATE sellers SET code = ?, username = ? WHERE id = ?', [code, username, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id, code, username });
    });
});

// Delete a seller
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM sellers WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(204).end();
    });
});

module.exports = router;
