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
        <BarChart width={835} height={320} data={data}>
          <XAxis dataKey="name" />

          <YAxis domain={[65, 120]} hide={true} />
          <YAxis
            yAxisId="right"
            orientation="right"
            position="right"
            ticks={[70, 230, 390]}
          />
          <Tooltip />

          <Legend
            layout="vertical"
            verticalAlign="top"
            align="right"
            wrapperStyle={{ right: "180px" }}
          />
          <Bar
            dataKey="weight"
            fill="rgba(40, 45, 48, 1)"
            barSize={7}
            radius={[5, 5, 0, 0]}
          />
          <Bar
            dataKey="calories"
            fill="rgba(230, 0, 0, 1)"
            yAxisId="right"
            barSize={7}
            radius={[5, 5, 0, 0]}
          ></Bar>
        </BarChart>
      )}
    </div>
  );
};

export default UserActivity;
