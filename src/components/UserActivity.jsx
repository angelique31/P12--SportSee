import React from "react";
import { USER_ACTIVITY } from "../mockedData";
import { useParams } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

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
  /**
   * Fonction pour personnaliser le tooltip (infobulle)
   * @param {*} param0
   * @returns
   */
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip"
          style={{
            color: "rgba(255, 255, 255, 1)",
            fontSize: "0.5rem",
            fontFamily: "Roboto",
            fontWeight: "500",
            padding: "15px 10px",
            backgroundColor: "rgba(230, 0, 0, 1)",
          }}
        >
          <p>{`${payload[0].value} kg`}</p>
          <p style={{ margin: "20px 0 0 0" }}>{`${payload[1].value} kCal`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="recharts">
      <div className="data_title">
        <h2 className="data_title--name">Activité quotidienne</h2>
        <p className="data_title--weight">Poids (kg)</p>
        <p className="data_title--calorie">Calories brûlées (kCal)</p>
      </div>

      {userActivity && (
        <BarChart
          className="my-bar-chart"
          width={702}
          height={206}
          data={data}
          margin={{ left: 30 }}
        >
          <XAxis dataKey="name" />

          <YAxis domain={[65, 120]} hide={true} />
          <YAxis
            yAxisId="right"
            orientation="right"
            position="right"
            // ticks={[70, 230, 390]}
          />
          <Tooltip content={<CustomTooltip />} />

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
