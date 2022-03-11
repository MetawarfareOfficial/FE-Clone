export const TokenQuery = `
  query ($tokenId: ID!, $first: Int!) {
    token(id: $tokenId) {
      symbol
      dayData(first: $first, orderBy: date, orderDirection: desc) {
        date
        liquidity
        priceUSD
      }
    }
  }
`;
