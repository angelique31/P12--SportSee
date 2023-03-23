import React from "react";
import { useParams } from "react-router-dom";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import { USER_MAIN_DATA } from "../mockedData";

const RadialBarChartUser = () => {
  const { userId } = useParams();
  const user = USER_MAIN_DATA.find((item) => item.id === parseInt(userId));
  const score = user.todayScore
    ? parseInt(user.todayScore * 100)
    : parseInt(user.score * 100);

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

      <ResponsiveContainer width={600} height={600}>
        <RadialBarChart
          cx="50%"
          cy="63%"
          innerRadius="25%"
          outerRadius="100%"
          barSize={10}
          data={data}
          startAngle={90}
          endAngle={450}
        >
          <circle cx="50%" cy="63%" fill="white" r="90"></circle>
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

export default RadialBarChartUser;

/********************************* */

// import React from "react";
// import { useParams } from "react-router-dom";
// import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
// import { USER_MAIN_DATA } from "../mockedData";

// const UserScore = () => {
//   const { userId } = useParams();
//   const user = USER_MAIN_DATA.find((item) => item.id === parseInt(userId));
//   const score = user.todayScore
//     ? parseInt(user.todayScore * 100)
//     : parseInt(user.score * 100);

//   const data = [
//     { value: score, fill: "#FF0000" },
//     { value: 100 - score, fill: "#FFFFFF" },
//   ];

//   return (
//     <div className="user_score">
//       <h1>Score :</h1>

//       <ResponsiveContainer
//         className="user_score_container"
//         width={213}
//         height={220}
//       >
//         <PieChart>
//           <Pie
//             data={data}
//             dataKey="value"
//             cx="center"
//             cy="center"
//             innerRadius="90"
//             outerRadius="100"
//             cornerRadius="10"
//             startAngle={90}
//             endAngle={450}
//           >
//             {data.map((entry, index) => (
//               <Cell key={index} fill={entry.fill} />
//             ))}
//           </Pie>
//           <text
//             x="50%"
//             y="50%"
//             textAnchor="middle"
//             dominantBaseline="middle"
//             style={{ fill: "#000000" }}
//           >
//             {score}% de votre objectif
//           </text>
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default UserScore;
