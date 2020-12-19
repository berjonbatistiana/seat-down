export const convertDate = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  let day = date.getDate();
  if (day.toString().length === 1) {
    day = `0${day}`;
  }
  return [year, month, day].join("-");
};

export const compareDate = (dateA, dateB) => {
  // gets milliseconds of both dates.
  dateA = typeof dateA ==='object'? convertDate(dateA):dateA
  dateB = typeof dateB ==='object'? convertDate(dateB):dateB
  const milliSDateA = new Date(dateA).getTime();
  const milliDateB = new Date(dateB).getTime();

  return milliSDateA === milliDateB;
}

export const getLocalDate = () => {
  const date = new Date(Date.now());
  return new Date(date.toString());
}
