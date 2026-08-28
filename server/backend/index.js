import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js'; // Adjust path to your auth router file

const app = express();

// 1. Enable CORS for your local front-end development port
app.use(cors({
  origin: ["http://localhost:5174", "http://localhost:5173"],
  credentials: true
}));

// 2. Body parser middleware
app.use(express.json());

// 3. Mount the auth routes with the exact '/api/auth' path prefix
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));