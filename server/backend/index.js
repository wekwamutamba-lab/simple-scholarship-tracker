require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const scholarshipRoutes = require('./routes/scholarshipRoutes');

const app = express();

// 1. Enable CORS for frontend development ports
app.use(cors({
  // origin: ["http://localhost:5174", "http://localhost:5173", "http://127.0.0.1:5174", "http://127.0.0.1:5173"],
  // credentials: true
}));

// 2. Body parser middleware
app.use(express.json());

// 3. Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/scholarships', scholarshipRoutes);

// 4. Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
