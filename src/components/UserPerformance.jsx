import React from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis } from "recharts";
import { USER_PERFORMANCE } from "../mockedData";
import { useParams } from "react-router-dom";

const UserPerformance = () => {
  const { userId } = useParams();
  const userPerformance = USER_PERFORMANCE.find(
    (item) => item.userId === parseInt(userId)
  );
  /**
   *  Un objet contenant les traductions des noms de catégories en anglais vers le français.
   */
  const translations = {
    cardio: "cardio",
    energy: "énergie",
    endurance: "endurance",
    strength: "force",
    speed: "vitesse",
    intensity: "intensité",
  };

  /**
   * Un objet contenant les angles en degrés pour positionner les catégories (axes) autour du graphique RadarChart.
   */
  const sortOrder = {
    5: 90, // intensity
    4: 150, // cardio
    3: 210, // energy
    2: 270, // endurance
    1: 330, // strength
    6: 30, // speed
  };

  /**
   * Un tableau d'objets contenant les données formatées pour être utilisées dans le composant RadarChart.
   * Chaque objet inclut la catégorie traduite, la valeur de performance et l'angle associé à la catégorie.
   * Le tableau est trié en fonction des angles pour positionner correctement les catégories dans le graphique.
   * @type {Array<{category: string, value: number, angle: number}>}
   */
  const radarChartData = userPerformance.data
    .map((item) => ({
      category: translations[userPerformance.kind[item.kind]],
      value: item.value,
      angle: sortOrder[item.kind],
    }))
    .sort((a, b) => a.angle - b.angle);

  const axisLabelStyle = {
    fill: "rgba(255, 255, 255, 1)",
    fontSize: "0.75rem",
    fontFamily: "Roboto",
    fontWeight: "500",
  };

  return (
    <div className="radarChart">
      <RadarChart
        cx={125}
        cy={110}
        outerRadius={90}
        width={250}
        height={290}
        data={radarChartData}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="category" tick={{ ...axisLabelStyle }} />

        <Radar
          name="Performance"
          dataKey="value"
          fill="rgba(255, 1, 1)"
          fillOpacity={0.7}
        />
      </RadarChart>
    </div>
  );
};

export default UserPerformance;
