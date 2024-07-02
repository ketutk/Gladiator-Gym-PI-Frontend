export function formatDate(date) {
  // Extract the day, month, and year from the date object
  let day = date.getDate();
  let month = date.getMonth() + 1; // Months are zero-based
  let year = date.getFullYear();

  // Add leading zeros to day and month if they are less than 10
  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }

  // Return the formatted date string
  return day + "-" + month + "-" + year;
}
