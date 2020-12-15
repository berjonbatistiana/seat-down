export const convertDate = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  let day = date.getDate();
  if (day.toString().length == 1) {
    day = `0${day}`;
  }
  return [year, month, day].join("-");
};

export const getLocalDate = () => {
  const date = new Date(Date.now());
  return new Date(date.toString());
}
