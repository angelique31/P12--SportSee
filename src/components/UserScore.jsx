import React from "react";
import { USER_MAIN_DATA } from "../mockedData";
import { useParams } from "react-router-dom";

const UserScore = () => {
  const { userId } = useParams();
  const user = USER_MAIN_DATA.find((item) => item.id === parseInt(userId));
  const score = user.todayScore
    ? parseInt(user.todayScore * 100)
    : parseInt(user.score * 100);

  return (
    <div className="user_score">
      <h1>User score :</h1>
      <p>Score : {score}%</p>
    </div>
  );
};

export default UserScore;
