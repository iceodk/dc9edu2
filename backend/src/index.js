import express from 'express';
import { PrismaClient } from '@prisma/client';
import stamdataRoutes from './routes/stamdata.js';
import optagRoutes from './routes/optag.js';
import diplomasRoutes from './routes/diplomas.js';
import cors from 'cors';

const app = express();
const prisma = new PrismaClient();

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3001'
]

const corsOptions = {
  origin: (origin, callback) => {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true, // optional: if you're using cookies or auth headers
}



app.use(express.json());
app.use(cors(corsOptions));
/* 
app.use(cors({
  origin: 'http://localhost:5173'
}));
 */
app.get('/', (req, res) => {
  res.send('Welcome to DC9Edu Backend!');
});

app.use('/api/stamdata', stamdataRoutes);
app.use('/api/optag', optagRoutes);
app.use('/api/diplomas', diplomasRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
