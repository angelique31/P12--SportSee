import React from "react";
import PropTypes from "prop-types";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

/**
 * Array containing the letters corresponding to the days of the week.
 * The days are indexed from 0 (Monday) to 6 (Sunday).
 *
 * @type {Array}
 */
const dayLabels = ["L", "M", "M", "J", "V", "S", "D"];

/**
 * Function to convert numbers into letters for days of the week.
 *
 * @param {number} dayNumber - The day number(1-7).
 * @returns {string} The letter corresponding to the day of the week (L, M, M, J, V, S, D).
 */
const dayFormatter = (dayNumber) => {
  return dayLabels[dayNumber - 1] || "";
};

/**
 * Custom component to display the letters of the days of the week on the X-axis of the chart.
 *
 * @param {*} param0 - Les propriétés du composant, passées sous forme d'objet (x, y, payload).
 * @returns The custom component for displaying the letters of the days of the week on the X-axis of the chart.
 */
const CustomizedAxisTick = ({ x, y, payload }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={5}
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
 * Component that displays a customized tooltip when the user
 * hovers over a point on the average session duration chart.
 *
 * @param {boolean} active - the tooltip should be displayed or not.
 * @param {Object[]} payload - Array containing the data associated with the hovered point.
 * @param {string} payload[].value - Value associated with the hovered point (session duration in minutes)
 * @returns {JSX.Element} React element representing the custom tooltip.
 */
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="custom_tooltip_session"
        style={{
          color: "black",
          fontSize: "0.5rem",
          fontFamily: "Roboto",
          fontWeight: "500",
          backgroundColor: "rgba(255, 255, 255, 1)",
          width: "39px",
          height: "25px",
        }}
      >
        <p className="custom_tooltip_session--text">{`${payload[0].value} min`}</p>
      </div>
    );
  }
  return null;
};
/**
 * Disable the browser's default cursor when hovering over the chart.
 */
const CustomCursor = () => null;

/**
 * LineChartUser component displaying a line chart of the average session duration
 * for a given user. The chart shows session duration in minutes for each day of the week
 *
 * @component
 * <LineChartUser transformedData={transformedData} userId={1} />
 *
 * @param {Object[]} transformedData - Array of objects representing the chart data.
 * @param {number} userId - User's ID.
 */
const LineChartUser = ({ transformedData, userId }) => {
  const [surfaceColor, setSurfaceColor] = React.useState(
    "rgba(255, 0, 0, 0.4)"
  );
  const [maskPosition, setMaskPosition] = React.useState(0);

  /**
   * Handles the mouse movement on the chart and modifies the background color.
   *
   * @param {Object} e - Object representing the mouse move event.
   * @param {number} e.chartX - Horizontal position of the mouse on the chart.
   * @param {string} e.activeLabel - X-axis label of the chart corresponding to the mouse position.
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
              width={213 - maskPosition}
              height={233}
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
        width={213}
        height={233}
        data={transformedData}
        margin={{ top: 70, right: 30, left: 20, bottom: 5 }}
        onMouseMove={handleMouseMove}
      >
        <rect
          x={0}
          y={0}
          width={maskPosition}
          height={260}
          fill="rgba(255, 0, 0, 0.4)"
        />
        <rect
          x={maskPosition}
          y={0}
          width={213 - maskPosition}
          height={233}
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
          padding={{ top: 20, bottom: 30 }}
        />
        <Tooltip content={<CustomTooltip />} cursor={<CustomCursor />} />

        <Line
          dataKey={`User${userId}`}
          stroke="url(#gradient)"
          type="natural"
          scale="band"
          strokeWidth={2}
          dot={false}
        />
        <rect
          x={0}
          y={0}
          width={213}
          height={220}
          fill="transparent"
          mask="url(#mask)"
        />
      </LineChart>
    </div>
  );
};

LineChartUser.propTypes = {
  transformedData: PropTypes.array,
  userId: PropTypes.number,
};

export default LineChartUser;
