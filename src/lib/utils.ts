
const capitalizeFirst = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const unixTimestamp = () => {
  return Math.floor(Date.now() / 1000);
}

export {capitalizeFirst, unixTimestamp}
