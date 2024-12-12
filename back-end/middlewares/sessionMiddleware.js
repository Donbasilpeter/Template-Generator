
// Middleware to check if the sessionId belongs to the userId

import UserSession from "../models/UserSession.js";

export const checkSessionOwnership = async (req, res, next) => {
  try {
    const { sessionId } = req.query;
    const userId = req.user.id

    // Ensure both sessionId and userId are provided
    if (!userId) {
      return res.status(400).json({ error: 'User ID not found.' });
    }

    if(!sessionId){
        next()
    }
    else{
      let session = await UserSession.findById(sessionId)

      if (!session) {
        return res.status(404).json({ error: 'Session not found.' });
      }
  
      // Check if the session belongs to the userId
      if (session.userId !== userId) {
        return res.status(403).json({ error: 'Session does not belong to this user.' });
      }
  
      // If the session belongs to the user, proceed to the next middleware or route handler
      next();
    }
 
  } catch (error) {
    console.error('Error checking session ownership:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};
