// import React, { useState, useEffect } from "react";
// import { Radar, RadarChart, PolarGrid, PolarAngleAxis } from "recharts";
// import { useParams } from "react-router-dom";
// import ApiService from "../../api/ApiService";
// import UserPerformance from "../../api/RadarChartClass";
// // import { dataMocked } from "../api/ApiSetting";

// const RadarChartUser = () => {
//   const { userId } = useParams();
//   const [userPerformance, setUserPerformance] = useState(null);

//   useEffect(() => {
//     async function fetchData() {
//       const performanceObject = await ApiService.getUserPerformance(userId);
//       console.log("PerformanceObject from API:", performanceObject);
//       const performanceData = performanceObject.data.data;
//       // console.log(performanceData);
//       const kind = performanceObject.data.kind;
//       // console.log(kind);

//       const userPerformanceInstance = new UserPerformance(
//         userId,
//         kind,
//         performanceData
//       );
//       setUserPerformance(userPerformanceInstance);
//     }
//     fetchData();
//   }, [userId]);

//   /**
//    *  Un objet contenant les traductions des noms de catégories en anglais vers le français.
//    */
//   const translations = {
//     cardio: "Cardio",
//     energy: "Energie",
//     endurance: "Endurance",
//     strength: "Force",
//     speed: "Vitesse",
//     intensity: "Intensité",
//   };

//   /**
//    * Un objet contenant les angles en degrés pour positionner les catégories (axes) autour du graphique RadarChart.
//    */
//   const sortOrder = {
//     5: 90, // intensity
//     4: 150, // cardio
//     3: 210, // energy
//     2: 270, // endurance
//     1: 330, // strength
//     6: 30, // speed
//   };

//   const radarChartData = userPerformance
//     ? userPerformance.data
//         .map((item) => ({
//           category: translations[item.kind],
//           value: item.value,
//           angle: sortOrder[item.kind],
//         }))
//         .sort((a, b) => a.angle - b.angle)
//     : null;

//   const axisLabelStyle = {
//     fill: "rgba(255, 255, 255, 1)",
//     fontSize: "0.75rem",
//     fontFamily: "Roboto",
//     fontWeight: "500",
//   };

//   return (
//     <div className="radarChart">
//       <RadarChart
//         key={userId}
//         className="my-radar-chart"
//         cx={105}
//         cy={85}
//         outerRadius={65}
//         width={213}
//         height={220}
//         data={radarChartData}
//         innerRadius="5%"
//       >
//         <PolarGrid radialLines={false} />
//         <PolarAngleAxis
//           dataKey="category"
//           tickLine={false}
//           tickSize={10}
//           dy={3}
//           tick={{ ...axisLabelStyle }}
//         />

//         <Radar
//           name="Performance"
//           dataKey="value"
//           fill="rgba(255, 1, 1)"
//           fillOpacity={0.7}
//         />
//       </RadarChart>
//     </div>
//   );
// };

// export default RadarChartUser;
