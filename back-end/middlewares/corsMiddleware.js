import cors from 'cors';

export const corsMiddleware = cors({
  origin:  process.env.CORS_ORIGIN, // Replace with the allowed origin
});
