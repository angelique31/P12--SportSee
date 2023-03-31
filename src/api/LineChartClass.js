// import PropTypes from "prop-types";

// class LineChartClass {
//   constructor(data) {
//     console.log(data);
//     this.id = data.userId;
//     this.sessions = data.sessions.map((session) => ({
//       day: session.day,
//       sessionLength: session.sessionLength,
//     }));
//   }
// }

// LineChartClass.propTypes = {
//   data: PropTypes.shape({
//     userId: PropTypes.number.isRequired,
//     sessions: PropTypes.shape({
//       day: PropTypes.number.isRequired,
//       sessionLength: PropTypes.number.isRequired,
//     }).isRequired,
//   }).isRequired,
// };

// export default LineChartClass;

/************************************* */
class LineChartClass {
  constructor(data) {
    // console.log(data);
    this.id = data.userId;
    this.transformedData = this.transformData(data.sessions);
  }

  transformData(sessions) {
    const transformedData = [];

    sessions.forEach((session) => {
      const dayData = transformedData.find(
        (entry) => entry.day === session.day
      );

      if (dayData) {
        dayData[this.id] = session.sessionLength;
      } else {
        transformedData.push({
          day: session.day,
          [this.id]: session.sessionLength,
        });
      }
    });

    return transformedData.sort((a, b) => a.day - b.day);
  }
}

export default LineChartClass;
