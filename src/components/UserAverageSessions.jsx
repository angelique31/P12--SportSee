import React from "react";
import { USER_AVERAGE_SESSIONS } from "../mockedData";
import { useParams } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

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

/**
 * fonction pour convertir les chiffres en lettres de jours de la semaine
 */
const dayLabels = ["L", "M", "M", "J", "V", "S", "D"];

const dayFormatter = (dayNumber) => {
  return dayLabels[dayNumber - 1] || "";
};

/**
 * Fonction pour personnaliser les lettres des jours
 * @param {*} param0
 * @returns
 */
const CustomizedAxisTick = ({ x, y, payload }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="rgba(255, 255, 255, 1)"
        fontSize="0.75rem"
        fontFamily="Roboto"
        fontWeight="500"
        opacity={0.5}
      >
        {dayFormatter(payload.value)}
      </text>
    </g>
  );
};
/**
 * Fonction pour personnaliser le tooltip
 * @param {*} param0
 * @returns
 */
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom_tooltip_session">
        <p className="custom_tooltip_session--text">{`${payload[0].value} min`}</p>
      </div>
    );
  }
  return null;
};
const CustomCursor = () => null;

const UserAverageSessions = () => {
  const { userId } = useParams();
  const transformedData = transformData(USER_AVERAGE_SESSIONS);
  const [surfaceColor, setSurfaceColor] = React.useState(
    "rgba(255, 0, 0, 0.4)"
  );
  const [maskPosition, setMaskPosition] = React.useState(0);

  /**
   * Gère le mouvement de la souris sur le graphique et modifie la couleur de fond
   * @param {*} e
   */
  const handleMouseMove = (e) => {
    if (e && e.activeLabel) {
      const labelIndex = dayLabels.indexOf(dayFormatter(e.activeLabel));
      const colorIntensity = 0.4 + (labelIndex / (dayLabels.length - 1)) * 0.6;
      setSurfaceColor(`rgba(200, 0, 0, ${colorIntensity})`);
      setMaskPosition(e.chartX);
    }
  };

  return (
    <div className="average_session">
      <h2 className="average_session--title">Durée moyenne des sessions</h2>
      <svg style={{ height: 0 }}>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.4)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 1)" />
          </linearGradient>
          <mask id="mask">
            <rect
              x={maskPosition}
              y={0}
              width={258 - maskPosition}
              height={263}
              fill="url(#maskGradient)"
            />
          </mask>
          <linearGradient id="maskGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 1)" />
          </linearGradient>
        </defs>
      </svg>

      <LineChart
        width={258}
        height={263}
        data={transformedData}
        margin={{ top: 70, right: 30, left: 20, bottom: 5 }}
        onMouseMove={handleMouseMove}
      >
        <rect
          x={0}
          y={0}
          width={maskPosition}
          height={263}
          fill="rgba(255, 0, 0, 0.4)"
        />
        <rect
          x={maskPosition}
          y={0}
          width={258 - maskPosition}
          height={263}
          fill={surfaceColor}
        />
        <XAxis
          dataKey="day"
          tickFormatter={dayFormatter}
          axisLine={false}
          tickLine={false}
          tick={<CustomizedAxisTick />}
        />
        <YAxis
          label={{
            angle: -90,
            position: "insideLeft",
          }}
          hide
          domain={[10, 60]}
          padding={{ top: 20 }}
        />
        <Tooltip content={<CustomTooltip />} cursor={<CustomCursor />} />

        <Line
          type="monotone"
          dataKey={`User${userId}`}
          stroke="url(#gradient)"
          strokeWidth={2}
          dot={false}
        />
        <rect
          x={0}
          y={0}
          width={258}
          height={263}
          fill="transparent"
          mask="url(#mask)"
        />
      </LineChart>
    </div>
  );
};

export default UserAverageSessions;
