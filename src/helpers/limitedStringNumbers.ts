export const limitedStringNumbers = (str: String | null, length: number) => {
  if (str) {
    const matchedNumbers = str.match(/[0-9]/g);
    if (matchedNumbers && matchedNumbers.length >= length) {
      return str.slice(0, length + 1) + '...';
    }
    return str;
  }
  return str;
};
