import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

const RadialBarChartUser = ({ userScore }) => {
  // console.log("userScore prop:", userScore);
  // fonctionne pour MockApi :
  // const score = userScore.todayScore
  //   ? parseInt(userScore.todayScore * 100)
  //   : parseInt(userScore.score * 100);

  // fonctionne avec l'API
  // const score = userScore
  //   ? parseInt((userScore.todayScore || userScore.score) * 100)
  //   : 0;

  // Cela permettra d'utiliser la bonne logique de calcul en fonction de l'API utilisée:
  const score = userScore
    ? parseInt((userScore.todayScore ?? userScore.score) * 100)
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
