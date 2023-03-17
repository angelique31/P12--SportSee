// import React from "react";
// import { USER_AVERAGE_SESSIONS } from "../mockedData";
// import { useParams } from "react-router-dom";

// const UserAverageSessions = () => {
//   const { userId } = useParams();
//   const userSessions = USER_AVERAGE_SESSIONS.find(
//     (item) => item.userId === parseInt(userId)
//   );

//   return (
//     <div>
//       <h2>Average sessions</h2>
//       {userSessions && (
//         <ul>
//           {userSessions.sessions.map((session) => (
//             <li key={session.day}>
//               Day {session.day}: {session.sessionLength} min
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default UserAverageSessions;

/************************************/

import React from "react";
import { USER_AVERAGE_SESSIONS } from "../mockedData";
import { useParams } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const transformData = (data) => {
  const transformedData = [];

  data.forEach((user) => {
    user.sessions.forEach((session) => {
      const dayData = transformedData.find(
        (entry) => entry.day === session.day
      );

      if (dayData) {
        dayData[`User${user.userId}`] = session.sessionLength;
      } else {
        transformedData.push({
          day: session.day,
          [`User${user.userId}`]: session.sessionLength,
        });
      }
    });
  });

  return transformedData.sort((a, b) => a.day - b.day);
};

const UserAverageSessions = () => {
  const { userId } = useParams();
  const transformedData = transformData(USER_AVERAGE_SESSIONS);

  return (
    <div className="recharts_session">
      <h2>Average sessions</h2>
      <LineChart
        width={258}
        height={263}
        data={transformedData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="day"
          label={{ value: "Day", position: "insideBottomRight", offset: 0 }}
        />
        <YAxis
          label={{
            value: "Session Length (min)",
            angle: -90,
            position: "insideLeft",
          }}
          // domain={["dataMin", "dataMax + 50"]}
          domain={["auto", (dataMax) => Math.ceil(dataMax * 2)]}
        />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey={`User${userId}`}
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </div>
  );
};

export default UserAverageSessions;
