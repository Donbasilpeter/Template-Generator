
import { getAllSessionService } from "../services/sessionService.js";

export const getAllSessions = async (req, res) => {
  try {
    const userId = req.user.id


    // Call service layer to handle business logic
    const response = await getAllSessionService(userId);

    // Return response to client
    res.json({ result: response  });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
};
