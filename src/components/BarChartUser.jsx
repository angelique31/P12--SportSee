import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const BarChartUser = ({ userActivity }) => {
  const data = userActivity?.sessions.map((session) => ({
    name: session.day ? new Date(session.day).getDate().toString() : "",
    weight: session.kilogram,
    calories: session.calories,
  }));
  // console.log(data);

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
        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            className="my-bar-chart"
            barSize={7}
            data={data}
            margin={{ left: 30, bottom: 40 }}
          >
            <CartesianGrid
              strokeDasharray="1"
              horizontal={true}
              vertical={false}
              dot={true}
              // horizontalPoints={[68]}
            />
            <XAxis
              dataKey="name"
              type="number"
              domain={["dataMin", "dataMax"]}
              tick={{
                fill: "#9B9EAC",
                fontFamily: "Roboto",
                fontWeight: 500,
                fontSize: "14px",
                textAlign: "center",
                dy: 5,
              }}
              stroke="#DEDEDE"
              tickSize={0}
              fontSize={12}
              tickMargin={10}
              padding={{ left: 15, right: 10 }}
              ticks={[1, 2, 3, 4, 5, 6, 7]}
            />
            <YAxis
              yAxisId="weight"
              type="number"
              domain={["dataMin - 3", "dataMax + 3"]}
              tickLine={false}
              axisLine={false}
              tickMargin={20}
              orientation="right"
              tick={{
                fill: "#9B9EAC",
                fontFamily: "Roboto",
                fontWeight: 500,
                fontSize: "14px",
                textAlign: "center",
                dy: 5,
              }}

              // domain={[65, 100]}
            />
            <YAxis
              yAxisId="calories"
              type="number"
              domain={["dataMin - 50", "dataMax + 50"]}
              hide
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              yAxisId="weight"
              dataKey="weight"
              fill="rgba(40, 45, 48, 1)"
              radius={[5, 5, 0, 0]}
            />
            <Bar
              yAxisId="calories"
              dataKey="calories"
              fill="rgba(230, 0, 0, 1)"
              radius={[5, 5, 0, 0]}
            ></Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default BarChartUser;
