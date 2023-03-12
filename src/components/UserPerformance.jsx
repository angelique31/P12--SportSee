import React from "react";
import { USER_PERFORMANCE } from "../mockedData";
import { useParams } from "react-router-dom";

const UserPerformance = () => {
  const { userId } = useParams();
  const userPerformance = USER_PERFORMANCE.find(
    (item) => item.userId === parseInt(userId)
  );

  return (
    <div>
      <h2>User performance:</h2>
      <ul>
        {userPerformance.data.map((item) => (
          <li key={item.kind}>
            {userPerformance.kind[item.kind]}: {item.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPerformance;
