import { getChatResponseFromService } from '../services/openaiService.js';

export const getChatResponse = async (req, res) => {
  try {
    const { description, sessionId } = req.query;
    const userId = req.user.id

    if (!description) {
      return res.status(400).json({ error: 'description are required.' });
    }

    // Call service layer to handle business logic
    const response = await getChatResponseFromService(sessionId, description,userId);

    // Return response to client
    res.json({ result: response.res.replace(/```jsx|```/g, '').trim(), sessionId : response.sessionId });
  } catch (error) {
    console.error('Error in chat controller:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};
