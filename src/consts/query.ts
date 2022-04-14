export const TokenQuery = `
  query ($tokenId: ID!, $first: Int!) {
    token(id: $tokenId) {
      symbol
      dayData(first: $first, orderBy: date, orderDirection: desc) {
        date
        volumeUSD
        priceUSD,
        liquidityUSD,
        liquidity
      }
    }
  }
`;

export const PairQuery = `
  query ($pairId: ID!) {
    pair(id: $pairId) {
      reserve0
    }
  }
`;
