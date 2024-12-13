import UserSession from "../models/UserSession.js";
import db from '../database/db.js'

export const getAllSessionService = async (userId) => {
    try {
        // Find all sessions where the userId matches the provided userId
        const sessions = await UserSession.find({ userId: userId });
        

        return sessions;
    } catch (error) {
        console.error("Error fetching sessions:", error);
        throw new Error("Error fetching sessions");
    }
};

export const deleteSessionService = async (sessionId) => {
    try {
        // Delete from ChatMemory collection
        await db.collection("ChatMemory").deleteOne({ sessionId });

        // Delete from UserSession collection
        await UserSession.deleteOne({ _id: sessionId });

        return {
            status: 200,
            message: "Session Deleted Successfully",
        };
    } catch (error) {
        console.error("Error deleting sessions:", error);
        throw new Error("Error deleting sessions");
    }
};

export const getSessionByIdService = async (sessionId) => {
    try {
        // Find a single session where the sessionId matches the provided sessionId
        const session = await db.collection("ChatMemory").findOne({sessionId });
        console.log(session)
        return {code :(session.messages.pop()).data.content.replace(/```jsx|```/g, '').trim(), sessionId:sessionId};
    } catch (error) {
        console.error("Error fetching session by ID:", error);
        throw new Error("Error fetching session by ID");
    }
};

export const updateSessionNameService = async (sessionId, newName) => {
    try {
      // Update the session name in the UserSession collection
      const updatedSession = await UserSession.findOneAndUpdate(
        { _id: sessionId }, // Filter by sessionId
        { $set: { name: newName } }, // Update the name field
        { new: true } // Return the updated document
      );
  
      if (!updatedSession) {
        throw new Error("Session not found.");
      }
  
      return {
        status: 200,
        message: "Session name updated successfully.",
        data: updatedSession,
      };
    } catch (error) {
      console.error("Error updating session name:", error);
      throw new Error("Error updating session name");
    }
  };
  


