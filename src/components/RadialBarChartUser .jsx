import PropTypes from "prop-types";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

/**
 * RadialBarChartUser component displays the user's score as a percentage of their goal.
 * The score is shown as a radial bar chart with a circular progress.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.userScore - User score object.
 * @returns {JSX.Element} RadialBarChartUser component.
 */
const RadialBarChartUser = ({ userScore }) => {
  const score = userScore
    ? parseInt((userScore.todayScore || userScore.score) * 100)
    : 0;

  const data = [
    {
      name: "Score",
      value: score,
    },
  ];

  return (
    <div className="user_score">
      <h1 className="score_title">Score</h1>
      <div className="score">
        <span className="score_percentage">{score}%</span>
        <br />
        <span className="score_label">de votre objectif</span>
      </div>

      <ResponsiveContainer width={"100%"} height={"100%"}>
        <RadialBarChart
          cx="50%"
          cy="55%"
          innerRadius="70%"
          outerRadius="83%"
          barSize={10}
          data={data}
          startAngle={90}
          endAngle={450}
        >
          <circle cx="50%" cy="55%" fill="white" r="80"></circle>
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar dataKey="value" cornerRadius={10} fill="#FF0000" />
          <text
            x="50%"
            y="65%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="score"
          ></text>
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};

RadialBarChartUser.propTypes = {
  userScore: PropTypes.object,
};
export default RadialBarChartUser;
