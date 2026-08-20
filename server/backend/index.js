require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const scholarshipRoutes = require('./routes/scholarshipRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/scholarships', scholarshipRoutes);

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});