import axios from 'axios';
import { COINGECKO_URL } from '../../config';

class DataCoingeckoService {
  supportedCurrencies = async (params: object) => {
    try {
      const rs = await axios.get(`${COINGECKO_URL}/simple/supported_vs_currencies`, params);
      return rs?.data;
    } catch (error) {
      return error;
    }
  };
  coinsDetail = async (id: string) => {
    try {
      const rs = await axios.get(`${COINGECKO_URL}/coins/${id}`);
      return rs?.data;
    } catch (error) {
      return error;
    }
  };
  coinsList = async (params: object) => {
    try {
      const rs = await axios.get(`${COINGECKO_URL}/coins/list`, params);
      return rs?.data;
    } catch (error) {
      return error;
    }
  };
  simplePrice = async (params: object) => {
    try {
      const rs = await axios.get(`${COINGECKO_URL}/simple/price`, params);
      return rs?.data;
    } catch (error) {
      return error;
    }
  };
  coinsHistory = async (id: string, params: object) => {
    try {
      const rs = await axios.get(`${COINGECKO_URL}/coins/${id}/market_chart`, { params });
      return rs?.data;
    } catch (error) {
      return error;
    }
  };
  coinsMarket = async (params: object) => {
    try {
      const rs = await axios.get(`${COINGECKO_URL}/coins/markets`, params);
      return rs;
    } catch (error) {
      return error;
    }
  };
}

export default new DataCoingeckoService();
