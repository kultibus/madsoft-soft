export const formatTime = (date: Date) => {
  const minutes = String(date.getMinutes()).split('').reverse();
  const seconds = String(date.getSeconds()).split('').reverse();

  minutes.push('0');
  seconds.push('0');

  return `${minutes.slice(0, 2).reverse().join('')}:${seconds
    .slice(0, 2)
    .reverse()
    .join('')}`;
};
