const dateConverter = date => {
  let day = date.substring(5, 7);
  let month = date.substring(7, 11);
  let year = date.substring(12, 16);

  if (day.charAt(0) === "0") day = day.substring(1);

  return `${month} ${day}, ${year}`;
};

export default dateConverter;
