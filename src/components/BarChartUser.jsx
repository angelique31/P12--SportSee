import React from "react";
import { USER_ACTIVITY } from "../mockedData";
import { useParams } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const BarChartUser = () => {
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
            textAlign: "center",
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
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            className="my-bar-chart"
            width={702}
            height={206}
            data={data}
            margin={{ left: 30, bottom: 40 }}
          >
            <CartesianGrid
              strokeDasharray="3"
              horizontal={true}
              vertical={false}
              dot={true}
            />
            <XAxis
              dataKey="name"
              type="number"
              domain={["dataMin", "dataMax"]}
              tick={{ fill: "#9B9EAC" }}
              stroke="#DEDEDE"
              tickSize={0}
              fontSize={12}
              tickMargin={10}
              padding={{ left: 15, right: 10 }}
            />
            <YAxis domain={[65, 100]} hide={true} />
            <YAxis
              yAxisId="right"
              orientation="right"
              position="right"
              ticks={[100, 280, 480]}
              interval={0}
              axisLine={false}
              tickMargin={15}
              tickLine={false}
              tickCount={-100}
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
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default BarChartUser;
