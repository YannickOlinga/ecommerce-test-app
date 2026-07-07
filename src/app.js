const express = require('express');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const registerRoutes = require('./routes/registerRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/login', authRoutes);
app.use('/register', registerRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);

module.exports = app;
