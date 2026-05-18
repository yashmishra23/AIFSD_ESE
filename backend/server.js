const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/employees', require('./routes/employee'));
app.use('/api/ai', require('./routes/ai'));

// Add root route so user doesn't see "Cannot GET /"
app.get('/', (req, res) => {
  res.send('<h1>Backend API is running successfully! \uD83C\uDF89</h1><p>Please go to <b><a href="http://localhost:5173">http://localhost:5173</a></b> to view the actual application website.</p>');
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected successfully'))
.catch(err => console.log('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
