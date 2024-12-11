import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { corsMiddleware } from './middlewares/corsMiddleware.js';
import dotenvConfig  from './config/dotenvConfig.js';
import chatRoutes from './routes/chatRoutes.js';
import authRoutes from './routes/authRoutes.js';


const app = express();
const port = 8000;



app.use(corsMiddleware); // CORS middleware
app.use(bodyParser.json()); // Parse JSON requests

app.use('/auth', authRoutes); // Handle user registration and login
app.use('/chat', chatRoutes); // Handle chat-related requests (protected)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
