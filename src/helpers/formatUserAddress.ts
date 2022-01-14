export const formatUserAddress = (address: string) => {
  const firstFiveCharacters = address.slice(0, 5);
  const lastFiveCharacters = address.slice(address.length - 6, address.length - 1);
  return firstFiveCharacters + '...' + lastFiveCharacters;
};
