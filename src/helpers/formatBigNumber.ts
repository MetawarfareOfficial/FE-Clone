export const formatBigNumber = (value: number | null, isAbbreviated = true) => {
  const OneMillion = 1000000;
  const OneThousand = 1000;
  const oneBillion = 1000000000;
  const millionNumberSuffixes = isAbbreviated ? 'M' : ' Million';
  const thousandNumberSuffixes = isAbbreviated ? 'K' : ' Thousand';
  const billionNumberSuffixes = isAbbreviated ? 'B' : ' Billion';
  const regex = /\.0$/;
  if (value) {
    if (value >= oneBillion) {
      return (value / oneBillion).toFixed(1).replace(regex, '') + billionNumberSuffixes;
    } else if (value >= OneMillion) {
      return (value / OneMillion).toFixed(1).replace(regex, '') + millionNumberSuffixes;
    } else if (value >= OneThousand) {
      return (value / OneThousand).toFixed(1).replace(regex, '') + thousandNumberSuffixes;
    }
  }
  return value;
};
