export const limitedStringNumbers = (str: String | null) => {
  if (str) {
    const matchedNumbers = str.match(/[0-9]/g);
    if (matchedNumbers && matchedNumbers.length >= 10) {
      return str.slice(0, 11) + '...';
    }
    return str;
  }
  return str;
};
