import React from "react";
import { USER_MAIN_DATA } from "../mockedData";
import { useParams } from "react-router-dom";

// const {
//   USER_MAIN_DATA,
//   // USER_ACTIVITY,
//   // USER_AVERAGE_SESSIONS,
//   // USER_PERFORMANCE
// } = require("../mockedData");

const MockApi = () => {
  const { userId } = useParams();
  const user = USER_MAIN_DATA.find((item) => item.id === parseInt(userId));
  // const user = USER_MAIN_DATA.find((item) => item.id === 12);

  return (
    <div>
      {user && (
        <div>
          <h2>{user.userInfos.firstName}</h2>
          <p>Score {user.todayScore}</p>
          <p>Calories: {user.keyData.calorieCount}</p>
          <p>Protéines: {user.keyData.proteinCount}</p>
          <p>Glucides: {user.keyData.carbohydrateCount}</p>
          <p>Lipides: {user.keyData.lipidCount}</p>
        </div>
      )}
    </div>
  );
};

export default MockApi;

/******************************************* */
