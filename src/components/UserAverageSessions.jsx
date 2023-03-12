import React from "react";
import { USER_AVERAGE_SESSIONS } from "../mockedData";
import { useParams } from "react-router-dom";

const UserAverageSessions = () => {
  const { userId } = useParams();
  const userSessions = USER_AVERAGE_SESSIONS.find(
    (item) => item.userId === parseInt(userId)
  );

  return (
    <div>
      <h2>Average sessions</h2>
      {userSessions && (
        <ul>
          {userSessions.sessions.map((session) => (
            <li key={session.day}>
              Day {session.day}: {session.sessionLength} min
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserAverageSessions;
