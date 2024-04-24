import { Root2 } from "../App"
import { axiosBase } from "../config/axiosBase"


export const api = {
  async GetCoins (page:number) {
    return (await axiosBase.get<Root2[]>(`?vs_currency=usd&order=market_cap_desc&per_page=${page}&page=1&sparkline=false`)).data
  }
}