import PropTypes from "prop-types";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis } from "recharts";

/**
 * * RadarChartUser component displaying a radar chart showing the user's performance
 * in various categories (cardio, energy, endurance, strength, speed, and intensity).
 * Composant RadarChartUser affichant un graphique radar montrant la performance
 * de l'utilisateur dans différentes catégories
 *
 * @component
 * @example
 * <RadarChartUser userPerformance={userPerformance} isDataLoaded={isDataLoaded} />
 *
 * @param {Object} userPerformance - Object containing the user's performance data.
 * @param {boolean} isDataLoaded - Indicates whether the data has been loaded. Indique si les données ont été chargées.
 */
const RadarChartUser = ({ userPerformance, isDataLoaded }) => {
  /**
   *  Un objet contenant les traductions des noms de catégories en anglais vers le français.
   *  An object containing translations of category names from English to French.
   */
  const translations = {
    cardio: "Cardio",
    energy: "Energie",
    endurance: "Endurance",
    strength: "Force",
    speed: "Vitesse",
    intensity: "Intensité",
  };

  /**
   * Un objet contenant les angles en degrés pour positionner les catégories (axes) autour du graphique RadarChart.
   * An object containing angles in degrees for positioning categories (axes) around the RadarChart.
   */
  const sortOrder = {
    5: 90, // intensity
    4: 150, // cardio
    3: 210, // energy
    2: 270, // endurance
    1: 330, // strength
    6: 30, // speed
  };

  const keys = Object.keys(sortOrder); // ['5', '4', '3', '2', '1', '6']

  const radarChartData = userPerformance
    ? userPerformance.data
        .map((item, index) => ({
          category: translations[item.kind],
          value: item.value,
          angle: sortOrder[keys[index]],
        }))
        .sort((a, b) => a.angle - b.angle)
    : null;

  const axisLabelStyle = {
    fill: "rgba(255, 255, 255, 1)",
    fontSize: "0.75rem",
    fontFamily: "Roboto",
    fontWeight: "500",
  };

  return (
    <div className="radarChart">
      {isDataLoaded && (
        <RadarChart
          key={userPerformance ? userPerformance.userId : null}
          className="my-radar-chart"
          cx={105}
          cy={85}
          outerRadius={65}
          width={213}
          height={220}
          data={radarChartData}
          innerRadius="5%"
        >
          <PolarGrid radialLines={false} />
          <PolarAngleAxis
            dataKey="category"
            tickLine={false}
            tickSize={10}
            dy={3}
            tick={{ ...axisLabelStyle }}
          />

          <Radar
            name="Performance"
            dataKey="value"
            fill="rgba(255, 1, 1)"
            fillOpacity={0.7}
          />
        </RadarChart>
      )}
    </div>
  );
};
RadarChartUser.propTypes = {
  userPerformance: PropTypes.object,
};

export default RadarChartUser;
