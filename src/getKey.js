/**
 * @param {string} time 
 */
export function getKey(time) {
  switch (time) {
    case "5 Min":
      return "fiveMin";
    case "Hour":
      return "hourly";
    case "Day":
      return "daily";
    case "Month":
      return "monthly";
    case "Year":
      return "yearly";
  }
}