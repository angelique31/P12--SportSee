import React from "react";
import PropTypes from "prop-types";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

/**
 * Tableau contenant les lettres correspondant aux jours de la semaine.
 * Les jours sont indexés de 0 (Lundi) à 6 (Dimanche).
 *
 * @type {Array}
 */
const dayLabels = ["L", "M", "M", "J", "V", "S", "D"];

/**
 * Fonction pour convertir les chiffres en lettres de jours de la semaine.
 *
 * @param {number} dayNumber - Le numéro de jour (1-7).
 * @returns {string} La lettre correspondant au jour de la semaine (L, M, M, J, V, S, D).
 */
const dayFormatter = (dayNumber) => {
  return dayLabels[dayNumber - 1] || "";
};

/**
 * Composant personnalisé pour afficher les lettres des jours de la semaine sur l'axe X du graphique.
 *
 * @param {*} param0 - Les propriétés du composant, passées sous forme d'objet (x, y, payload).
 * @returns Le composant personnalisé pour afficher les lettres des jours de la semaine sur l'axe X du graphique.
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
 * Composant qui affiche une info-bulle personnalisée lorsque l'utilisateur
 * survole un point sur le graphique de la durée moyenne des sessions.
 *
 * @param {boolean} active - Indique si l'info-bulle doit être affichée ou non.
 * @param {Object[]} payload - Tableau contenant les données associées au point survolé.
 * @param {string} payload[].value - Valeur associée au point survolé (durée d'une session en minutes).
 * @returns {JSX.Element} Élément React représentant l'info-bulle personnalisée.
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
 * Désactiver le curseur par défaut du navigateur lorsqu'il survole le graphique
 */
const CustomCursor = () => null;

/**
 * LineChartUser component displaying a line chart of the average session duration
 * for a given user. The chart shows session duration in minutes for each day of the week.
 * Composant LineChartUser affichant un graphique linéaire de la durée moyenne des sessions
 * pour un utilisateur donné. Le graphique montre la durée des sessions en minutes pour chaque jour de la semaine.
 *
 * @component
 * <LineChartUser transformedData={transformedData} userId={1} />
 *
 * @param {Object[]} transformedData - Array of objects representing the chart data.
 * @param {number} userId - User's ID.
 * @param {Object[]} transformedData - Tableau d'objets représentant les données du graphique.
 * @param {number} userId - Identifiant de l'utilisateur.
 */
const LineChartUser = ({ transformedData, userId }) => {
  const [surfaceColor, setSurfaceColor] = React.useState(
    "rgba(255, 0, 0, 0.4)"
  );
  const [maskPosition, setMaskPosition] = React.useState(0);

  /**
   * Gère le mouvement de la souris sur le graphique et modifie la couleur de fond
   *
   * @param {Object} e - Objet représentant l'événement de mouvement de la souris.
   * @param {number} e.chartX - Position horizontale de la souris sur le graphique.
   * @param {string} e.activeLabel - Étiquette de l'axe X du graphique correspondant à la position de la souris.
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
