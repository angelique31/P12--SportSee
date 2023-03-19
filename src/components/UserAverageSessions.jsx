import React from "react";
import { USER_AVERAGE_SESSIONS } from "../mockedData";
import { useParams } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

/**
 * Transforme les données brutes en un format adapté pour le graphique linéaire.
 *
 * @param {Array} data - Les données brutes, sous forme de tableau d'objets.
 * @returns {Array} Les données transformées, sous forme de tableau d'objets avec les durées de session pour chaque utilisateur pour chaque jour.
 */
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
      <div className="custom_tooltip_session">
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
 *Composant affichant la durée moyenne des sessions d'un utilisateur sous forme de graphique à ligne.
 * @returns {JSX.Element} Le composant de la durée moyenne des sessions.
 */
const UserAverageSessions = () => {
  const { userId } = useParams();
  const transformedData = transformData(USER_AVERAGE_SESSIONS);
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
        width={230}
        height={260}
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
          width={230 - maskPosition}
          height={260}
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
