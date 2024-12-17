import express from 'express';
import bodyParser from 'body-parser';
import { createCorsMiddleware } from './middlewares/corsMiddleware.js';
import dotenvConfig  from './config/dotenvConfig.js';
import chatRoutes from './routes/chatRoutes.js';
import authRoutes from './routes/authRoutes.js';
import session from './routes/sessionRoutes.js';



const app = express();
const port = 8000;


app.set('allowedOrigin', process.env.CORS_ORIGIN);
const corsMiddleware = createCorsMiddleware(app.get('allowedOrigin'));
app.use(corsMiddleware); // CORS middleware


app.use(bodyParser.json()); // Parse JSON requests

app.use('/auth', authRoutes); // Handle user registration and login
app.use('/chat', chatRoutes); // Handle chat-related requests 
app.use('/session', session); // Handle chat-related requests 


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
