import cors from 'cors';

export const corsMiddleware = cors({
  origin: 'http://localhost:3000', // Replace with the allowed origin
});
