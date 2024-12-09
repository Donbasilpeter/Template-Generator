import { withMessageHistory } from "../services/openaiService.js"; // Import from service

export const handleChat = async (req, res) => {
  const { description, sessionId } = req.query; // Use req.query to get parameters from the URL
  try {
    const response = await withMessageHistory.invoke({ description }, { configurable: { sessionId } });
    res.json({ result: response.replace(/```jsx|```/g, '').trim() });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
