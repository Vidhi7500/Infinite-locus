const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// const productRoutes = require('./routes/product.routes');
// const salesRoutes = require('./routes/sales.routes');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://ryzensingh:admin123@cluster0.kzz5ihj.mongodb.net/infinite-locus')
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('MongoDB connection error:', err));

// app.use('/api/products', productRoutes);
// app.use('/api/sales', salesRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});