import express from 'express';
import bodyParser from 'body-parser';
import { createCorsMiddleware } from './middlewares/corsMiddleware.js';
import dotenvConfig  from './config/dotenvConfig.js';
import chatRoutes from './routes/chatRoutes.js';
import authRoutes from './routes/authRoutes.js';
import session from './routes/sessionRoutes.js';



const app = express();
const port = 8000;


app.use(createCorsMiddleware(process.env.CORS_ORIGIN)); // CORS middleware


app.use(bodyParser.json()); // Parse JSON requests

app.use('/api/auth', authRoutes); // Handle user registration and login
app.use('/api/chat', chatRoutes); // Handle chat-related requests 
app.use('/api/session', session); // Handle chat-related requests 


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
