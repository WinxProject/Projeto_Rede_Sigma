// backend/routes/manufacturers.js
const express = require('express');
const router = express.Router();
const db = require('../index').db;

// Get all manufacturers
router.get('/', (req, res) => {
    db.query('SELECT * FROM manufacturers', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Add a new manufacturer
router.post('/', (req, res) => {
    const { cnpj, company_name, brand, contact, commercial_phone, mobile_phone } = req.body;
    db.query('INSERT INTO manufacturers (cnpj, company_name, brand, contact, commercial_phone, mobile_phone) VALUES (?, ?, ?, ?, ?, ?)', [cnpj, company_name, brand, contact, commercial_phone, mobile_phone], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: results.insertId, cnpj, company_name, brand, contact, commercial_phone, mobile_phone });
    });
});

// Update a manufacturer
router.put('/:id', (req, res) => {
    const { cnpj, company_name, brand, contact, commercial_phone, mobile_phone } = req.body;
    const { id } = req.params;
    db.query('UPDATE manufacturers SET cnpj = ?, company_name = ?, brand = ?, contact = ?, commercial_phone = ?, mobile_phone = ? WHERE id = ?', [cnpj, company_name, brand, contact, commercial_phone, mobile_phone, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id, cnpj, company_name, brand, contact, commercial_phone, mobile_phone });
    });
});

// Delete a manufacturer
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM manufacturers WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(204).end();
    });
});

module.exports = router;
