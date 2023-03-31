import { dataMocked } from "./ApiSetting";
import {
  USER_ACTIVITY,
  USER_PERFORMANCE,
  USER_AVERAGE_SESSIONS,
} from "../mockedData";
import { USER_MAIN_DATA } from "../mockedData";

const ApiService = {
  getUser: async (userId) => {
    if (dataMocked) {
      const userData = USER_MAIN_DATA.find(
        (item) => item.id === parseInt(userId)
      );
      console.log("Données mockées pour getUser :", userData);
      return { data: userData };
    } else {
      const response = await fetch(`http://localhost:3000/user/${userId}`);
      const data = await response.json();
      console.log("Données réelles pour getUser :", data);
      return data;
    }
  },

  getUserActivity: async (userId) => {
    if (dataMocked) {
      const userActivity = USER_ACTIVITY.find(
        (item) => item.userId === parseInt(userId)
      );
      return { data: userActivity };
    } else {
      const response = await fetch(
        `http://localhost:3000/user/${userId}/activity`
      );
      const data = await response.json();
      return data;
    }
  },

  getUserAverageSessions: async (userId) => {
    if (dataMocked) {
      const userAverageSessions = USER_AVERAGE_SESSIONS.find(
        (item) => item.userId === parseInt(userId)
      );
      return { data: userAverageSessions };
    } else {
      const response = await fetch(
        `http://localhost:3000/user/${userId}/average-sessions`
      );
      const data = await response.json();
      // console.log(data);
      return data;
    }
  },

  getUserPerformance: async (userId) => {
    if (dataMocked) {
      const userPerformance = USER_PERFORMANCE.find(
        (item) => item.userId === parseInt(userId)
      );
      return { data: userPerformance };
    } else {
      const response = await fetch(
        `http://localhost:3000/user/${userId}/performance`
      );
      const data = await response.json();
      // console.log(data);
      return data;
    }
  },
};

export default ApiService;
