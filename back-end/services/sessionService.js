import UserSession from "../models/UserSession.js";

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
