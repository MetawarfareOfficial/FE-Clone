interface monthlyFees {
  square: string;
  cube: string;
  tesseract: string;
}
export const getNoFeeContractType = (monthlyFees: monthlyFees) => {
  return [
    {
      cType: '0',
      fee: Number(monthlyFees.square),
    },
    {
      cType: '1',
      fee: Number(monthlyFees.cube),
    },
    {
      cType: '2',
      fee: Number(monthlyFees.tesseract),
    },
  ].filter((item) => item.fee === 0);
};
