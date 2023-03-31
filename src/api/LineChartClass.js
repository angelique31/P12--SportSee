/**
 * A class for transforming session data into a format suitable for a line chart.
 * Creates an instance of LineChartClass.
 * @param {Object} data - An object containing session data.
 */
class LineChartClass {
  constructor(data) {
    this.id = data.userId;
    this.transformedData = this.transformData(data.sessions);
  }

  /**
   * Transforms session data into a format suitable for a line chart.
   * @param {Array} sessions - An array of session objects.
   * @returns {Array} - An array of objects representing session data in a format suitable for a line chart.
   */
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
