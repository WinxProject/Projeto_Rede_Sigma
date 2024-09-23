// backend/routes/clients.js
const express = require('express');
const router = express.Router();
const db = require('../index').db;

// Get all clients
router.get('/', (req, res) => {
    db.query('SELECT * FROM clients', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Add a new client
router.post('/', (req, res) => {
    const { cpf, name, address, home_phone, cell_phone, income } = req.body;
    db.query('INSERT INTO clients (cpf, name, address, home_phone, cell_phone, income) VALUES (?, ?, ?, ?, ?, ?)', [cpf, name, address, home_phone, cell_phone, income], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: results.insertId, cpf, name, address, home_phone, cell_phone, income });
    });
});

// Update a client
router.put('/:id', (req, res) => {
    const { cpf, name, address, home_phone, cell_phone, income } = req.body;
    const { id } = req.params;
    db.query('UPDATE clients SET cpf = ?, name = ?, address = ?, home_phone = ?, cell_phone = ?, income = ? WHERE id = ?', [cpf, name, address, home_phone, cell_phone, income, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id, cpf, name, address, home_phone, cell_phone, income });
    });
});

// Delete a client
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM clients WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(204).end();
    });
});

module.exports = router;
