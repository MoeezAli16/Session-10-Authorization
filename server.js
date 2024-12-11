import express from 'express';
import database from './db/database.js';
// import bodyParser from 'body-parser';
import authRoutes from './routes/auth.js';
import protectedRoutes from './routes/protected.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
database();


// app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:5000`);
});
