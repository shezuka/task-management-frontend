const prepend = (num: number) => {
  const str = num.toString();
  return str.length === 1 ? `0${str}` : str;
};

export const dateToLocalIsoString = (date: Date) => {
  if (!date) date = new Date();
  let dateTime = `${date.getFullYear()}-${prepend(date.getMonth() + 1)}-${prepend(date.getDate())}T`;
  dateTime += `${prepend(date.getHours())}:${prepend(date.getMinutes())}:${prepend(date.getSeconds())}`;
  return dateTime;
};

export const getLocalIsoDate = (date?: Date) => {
  if (!date) date = new Date();
  return dateToLocalIsoString(date);
};

export const localIsoStringToUtcIsoString = (inIso: string) => {
  return dateToUtcIsoString(new Date(inIso));
};

export const dateToUtcIsoString = (date: Date) => {
  return date.toISOString().split(".")[0];
};
