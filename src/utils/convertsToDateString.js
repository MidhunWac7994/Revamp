export const convertToDateString = ({ date, month }) => {
  const monthMap = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12,
  };

  const monthNum = monthMap[month];
  const currentYear = new Date().getFullYear();

  const formattedMonth = String(monthNum).padStart(2, "0");
  const formattedDate = String(date).padStart(2, "0");

  return `${currentYear}-${formattedMonth}-${formattedDate}`;
};

export const convertDateStringToObject = (dateStr) => {
  const dateObj = new Date(dateStr);

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return {
    day: dayNames[dateObj.getDay()],
    date: dateObj.getDate(),
    month: monthNames[dateObj.getMonth()],
  };
};
