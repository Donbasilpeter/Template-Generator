import express from 'express';
import bodyParser from 'body-parser';
import { corsMiddleware } from './middlewares/corsMiddleware.js';
import dotenvConfig from './config/dotenvConfig.js'; // Default import
import chatRoutes from './routes/chatRoutes.js';

const app = express();
const port = 8000;

app.use(corsMiddleware); // CORS middleware
app.use(bodyParser.json()); // Parse JSON requests

app.use('/chat', chatRoutes); // Handle all chat-related requests

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
