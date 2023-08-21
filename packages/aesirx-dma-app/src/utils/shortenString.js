const shortenString = (str, first = 6, last = 4) => {
  return str?.substring(0, first) + '...' + str?.substring(str.length - last);
};
export { shortenString };
