const express = require('express');
const cors = require('cors');
require('dotenv').config();

const scholarshipRoutes = require('./routes/scholarshipRoutes');
const authRoutes = require('./routes/authRoutes'); 

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/scholarships', scholarshipRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});