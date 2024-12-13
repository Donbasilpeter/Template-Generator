
import { 
getAllSessionService,
deleteSessionService,
getSessionByIdService,
updateSessionNameService,
 } from "../services/sessionService.js";

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

export const getSessionById = async (req, res) => {
  try {
    // Extract sessionId from request parameters
    const { sessionId } = req.params;

    // Call service layer to handle business logic
    const response = await getSessionByIdService(sessionId);

    if (!response) {
      return res.status(404).json({ error: 'Session not found.' });
    }

    // Return response to client
    res.json({ result: response });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
};

export const deleteSession = async (req, res) => {
  try {
    const sessionId = req.params.sessionId; // Assuming the session ID is passed as a route parameter
    // Call service layer to handle business logic
    const response = await deleteSessionService( sessionId);

    // Return response to client
    res.json({ result: response });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
};

export const updateSessionName = async (req, res) => {
  try {
    // Extract sessionId and newName from request body and parameters
    const { sessionId } = req.params; // Assuming sessionId is a route parameter
    const { newName } = req.body; // Assuming newName is passed in the request body

    if (!newName) {
      return res.status(400).json({ error: 'New session name is required.' });
    }

    // Call service layer to handle business logic
    const response = await updateSessionNameService(sessionId, newName);

    if (!response) {
      return res.status(404).json({ error: 'Session not found.' });
    }

    // Return success response to client
    res.json({ message: 'Session name updated successfully.', result: response });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
};
