export const convertDate = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  let day = date.getDate();
  if (day.toString().length == 1) {
    day = `0${day}`;
  }
  return [year, month, day].join("-");
};

export const isDatePast = (date) => {
  // gets milliseconds of today and selected date without time and compares them.
  const milliSelected = new Date(convertDate(date)).getTime();
  const milliToday= new Date(new Date().toISOString().slice(0,10)).getTime();
  
  return milliSelected < milliToday;
}

export const getLocalDate = () => {
  const date = new Date(Date.now());
  return new Date(date.toString());
}
