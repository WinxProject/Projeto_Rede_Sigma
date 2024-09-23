// backend/index.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

// Configurações
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Conexão com o Banco de Dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'your_database_name'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

// Rotas
const clientRoutes = require('./routes/clients');
const vehicleRoutes = require('./routes/vehicles');
const operationRoutes = require('./routes/operations');
const orderRoutes = require('./routes/orders');
const manufacturerRoutes = require('./routes/manufacturers');
const sellerRoutes = require('./routes/sellers');

app.use('/api/clients', clientRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/operations', operationRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/manufacturers', manufacturerRoutes);
app.use('/api/sellers', sellerRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
