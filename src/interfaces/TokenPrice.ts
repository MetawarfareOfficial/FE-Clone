export interface TokenPrice {
  time: string | number;
  price: string | number;
}

export interface TokenDataTraderJoe {
  date: number;
  priceUSD: string;
  volumeUSD: string;
}

export interface TokenDataChart {
  date: number;
  price: number;
  marketCap: number;
}
