export const formatBigNumber = (value: number | null) => {
  const OneMillion = 1000000;
  const OneThousand = 1000;
  const regex = /\.0$/;
  if (value) {
    if (value >= OneMillion) {
      return (value / OneMillion).toFixed(1).replace(regex, '') + 'M';
    } else if (value >= OneThousand) {
      return (value / OneThousand).toFixed(1).replace(regex, '') + 'K';
    }
  }
  return value;
};
