import { dataMocked } from "./ApiSetting";
import {
  USER_ACTIVITY,
  USER_PERFORMANCE,
  USER_AVERAGE_SESSIONS,
} from "../mockedData";
import { USER_MAIN_DATA } from "../mockedData";

/**
 * ApiService is a utility module that provides functions to fetch data from a mock API or a real API.
 * It has four methods for retrieving user data: getUser, getUserActivity, getUserAverageSessions, and getUserPerformance.
 *
 * @module ApiService
 */
const ApiService = {
  getUser: async (userId) => {
    if (dataMocked) {
      const userData = USER_MAIN_DATA.find(
        (item) => item.id === parseInt(userId)
      );
      console.log("Données mockées pour getUser :", userData);
      return { data: userData };
    } else {
      try {
        const response = await fetch(`http://localhost:3000/user/${userId}`);
        if (response.ok) {
          const data = await response.json();
          return data;
        } else {
          console.error(`Status code: ${response.status}`);
          throw new Error("Serveur inaccessible");
        }
      } catch (error) {
        console.error(error);
        throw new Error("Serveur inaccessible");
      }
    }
  },

  getUserActivity: async (userId) => {
    if (dataMocked) {
      const userActivity = USER_ACTIVITY.find(
        (item) => item.userId === parseInt(userId)
      );
      return { data: userActivity };
    } else {
      try {
        const response = await fetch(
          `http://localhost:3000/user/${userId}/activity`
        );

        if (response.ok) {
          const data = await response.json();
          return data;
        } else {
          console.error(`Status code: ${response.status}`);
          throw new Error("Serveur inaccessible");
        }
      } catch (error) {
        console.error(error);
        throw new Error("Serveur inaccessible");
      }
    }
  },

  getUserAverageSessions: async (userId) => {
    if (dataMocked) {
      const userAverageSessions = USER_AVERAGE_SESSIONS.find(
        (item) => item.userId === parseInt(userId)
      );
      return { data: userAverageSessions };
    } else {
      try {
        const response = await fetch(
          `http://localhost:3000/user/${userId}/average-sessions`
        );

        if (response.ok) {
          const data = await response.json();
          return data;
        } else {
          console.error(`Status code: ${response.status}`);
          throw new Error("Serveur inaccessible");
        }
      } catch (error) {
        console.error(error);
        throw new Error("Serveur inaccessible");
      }
    }
  },

  getUserPerformance: async (userId) => {
    if (dataMocked) {
      const userPerformance = USER_PERFORMANCE.find(
        (item) => item.userId === parseInt(userId)
      );
      return { data: userPerformance };
    } else {
      try {
        const response = await fetch(
          `http://localhost:3000/user/${userId}/performance`
        );

        if (response.ok) {
          const data = await response.json();
          return data;
        } else {
          console.error(`Status code: ${response.status}`);
          throw new Error("Serveur inaccessible");
        }
      } catch (error) {
        console.error(error);
        throw new Error("Serveur inaccessible");
      }
    }
  },
};

export default ApiService;
