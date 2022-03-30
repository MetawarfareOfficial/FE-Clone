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

export const recentTransactionQuery = `
  query ($address: ID!, $date: Int!) {
    swaps (
      where: {
        sender: $address,
        date_gt: $date
      },
      orderBy: date,
      orderDirection: desc
    )
    {
      id
      sender
      date
      amountIn
      amountOut
      tokenIn {
        id
        symbol
      }
      tokenOut {
        id
        symbol
      }
    }
  }
`;
