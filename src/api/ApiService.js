import { dataMocked } from "./ApiSetting";
import { USER_ACTIVITY, USER_PERFORMANCE } from "../mockedData";

const ApiService = {
  getUser: async (userId) => {
    const response = await fetch(`http://localhost:3000/user/${userId}`);
    const data = await response.json();

    return data;
  },

  // getUserActivity: async (userId) => {
  //   const response = await fetch(
  //     `http://localhost:3000/user/${userId}/activity`
  //   );
  //   const data = await response.json();

  //   return data;
  // },

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
    const response = await fetch(
      `http://localhost:3000/user/${userId}/average-sessions`
    );
    const data = await response.json();
    // console.log(data);
    return data;
  },

  //   getUserPerformance: async (userId) => {
  //     const response = await fetch(
  //       `http://localhost:3000/user/${userId}/performance`
  //     );
  //     const data = await response.json();
  //     console.log(data);
  //     return data;
  //   },
  // };

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
      return data;
    }
  },
};

export default ApiService;
