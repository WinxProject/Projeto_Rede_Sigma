// backend/routes/vehicles.js
const express = require('express');
const router = express.Router();
const db = require('../index').db;

// Get all vehicles
router.get('/', (req, res) => {
    db.query('SELECT * FROM vehicles', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Add a new vehicle
router.post('/', (req, res) => {
    const { chassis_number, license_plate, brand, model, manufacturing_year, model_year, color, price } = req.body;
    db.query('INSERT INTO vehicles (chassis_number, license_plate, brand, model, manufacturing_year, model_year, color, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [chassis_number, license_plate, brand, model, manufacturing_year, model_year, color, price], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, chassis_number, license_plate, brand, model, manufacturing_year, model_year, color, price });
    });
});

// Update a vehicle
router.put('/:id', (req, res) => {
    const { chassis_number, license_plate, brand, model, manufacturing_year, model_year, color, price } = req.body;
    const { id } = req.params;
    db.query('UPDATE vehicles SET chassis_number = ?, license_plate = ?, brand = ?, model = ?, manufacturing_year = ?, model_year = ?, color = ?, price = ? WHERE id = ?', [chassis_number, license_plate, brand, model, manufacturing_year, model_year, color, price, id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id, chassis_number, license_plate, brand, model, manufacturing_year, model_year, color, price });
    });
});

// Delete a vehicle
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM vehicles WHERE id = ?', [id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(204).end();
    });
});

module.exports = router;
