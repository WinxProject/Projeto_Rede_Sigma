// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RoutesConfig from './config/routes';

ReactDOM.render(
    <React.StrictMode>
        <RoutesConfig />
    </React.StrictMode>,
    document.getElementById('root')
);
