import axios from "axios";

export const axiosBase = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3/coins/markets'
})