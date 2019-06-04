const toClockRange = ({ startTime, endTime }) =>
  `${toClockTime(startTime)} - ${toClockTime(endTime)}`;

const toClockTime = date =>
  date ? `${padWithZero(date.getHours())}:${padWithZero(date.getMinutes())}` : '--:--';

const padWithZero = num => (num <= 9 ? `0${num}` : num);

const formatDate = date =>
  `${date.getFullYear()}-${padWithZero(date.getMonth() + 1)}-${padWithZero(date.getDate())}`;

const getDaysInMonth = ({ year, month }) => {
  const date = new Date(year, month - 1, 1);
  const days = [];
  while (date.getMonth() === month - 1) {
    days.push(formatDate(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

const getDaysCountInMonth = date => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

const removeTime = date => {
  return new Date(date.setHours(0, 0, 0, 0));
};

export { removeTime, formatDate, toClockTime, toClockRange, getDaysInMonth, getDaysCountInMonth };
