export interface TokenPrice {
  time: string | number;
  price: string | number;
}

export interface TokenDataTraderJoe {
  date: number;
  priceUSD: string;
  liquidity: string;
}

export interface TokenDataChart {
  date: number;
  price: number;
  marketCap: number;
}
