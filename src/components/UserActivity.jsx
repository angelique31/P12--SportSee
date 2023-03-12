// import React from "react";
// import { USER_ACTIVITY } from "../mockedData";
// import { useParams } from "react-router-dom";

// const UserActivity = () => {
//   const { userId } = useParams();
//   const userActivity = USER_ACTIVITY.find(
//     (item) => item.userId === parseInt(userId)
//   );

//   return (
//     <div>
//       <h2>User Activity</h2>
//       {userActivity && (
//         <div>
//           {userActivity.sessions.map((session) => (
//             <div key={session.day}>
//               <p>Date: {session.day}</p>
//               <p>Weight: {session.kilogram} kg</p>
//               <p>Calories burned: {session.calories}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserActivity;

import React from "react";
import { USER_ACTIVITY } from "../mockedData";
import { useParams } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const UserActivity = () => {
  const { userId } = useParams();
  const userActivity = USER_ACTIVITY.find(
    (item) => item.userId === parseInt(userId)
  );

  const data = userActivity?.sessions.map((session) => ({
    name: session.day ? new Date(session.day).getDate().toString() : "",
    weight: session.kilogram,
    calories: session.calories,
  }));

  return (
    <div>
      <h2>Activité quotidienne</h2>
      {userActivity && (
        <BarChart width={600} height={400} data={data}>
          <XAxis dataKey="name" />
          <YAxis hide={true} />
          <YAxis
            yAxisId="right"
            orientation="right"
            position="right"
            ticks={[70, 230, 390]}
          />
          <Tooltip />
          {/* <Legend /> */}
          <Legend
            layout="vertical"
            verticalAlign="top"
            align="right"
            wrapperStyle={{ right: "172px" }}
          />
          <Bar dataKey="weight" fill="rgba(40, 45, 48, 1)" />
          <Bar dataKey="calories" fill="rgba(230, 0, 0, 1)" />
        </BarChart>
      )}
    </div>
  );
};

export default UserActivity;
