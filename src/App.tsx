import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import dayjs from 'dayjs';
import relativetime from 'dayjs/plugin/relativeTime';
import { NumberFormat } from './utils/NumberFormat';
import { api } from './services/api';
dayjs.extend(relativetime);

export interface Root2 {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply?: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi?: Roi;
  last_updated: string;
}

export interface Roi {
  times: number;
  currency: string;
  percentage: number;
}

function App() {
  const [data, setData] = useState<Root2[]>([]);
  const [count, setCount] = useState(12);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView && data.length) {
      setCount(prev => prev + 15);
    }
  }, [inView]);

  useEffect(() => {
    const fun = async () => {
      try {
        const data = await api.GetCoins(count);
        setData(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fun();
  }, [count]);
  return (
    <>
      <div className=" py-4">
        <h2
          className=" font-medium text-3xl text-center">
          Сurrent cryptocurrencies
        </h2>
        <div className="w-full items-center flex-col flex justify-start">
          <div className=" px-6 pt-6 pb-2 w-[800px] justify-center flex flex-wrap gap-10">
            {error ? (
              <h2 className=" text-xl font-medium mt-6 text-red-500 ">Данных нету</h2>
            ) : loading ? (
              <div className="loading-wave">
                <div className="loading-bar"></div>
                <div className="loading-bar"></div>
                <div className="loading-bar"></div>
                <div className="loading-bar"></div>
              </div>
            ) : (
              data.map(item => (
                <div key={item.id} className="container relative">
                  <div className="box">
                    <span className="title truncate w-44">{item.name}</span>
                    <div className="flex justify-center">
                      <img width={100} height={100} src={item.image} alt="" />
                    </div>
                    <div>
                      <strong>{NumberFormat(item.current_price)}</strong>
                      <strong className=" mt-2">
                        update - {dayjs(item.last_updated).fromNow()}
                      </strong>
                    </div>
                  </div>
                  <div className=" flex justify-center items-center right-[-13px] top-[-13px] absolute w-10 h-10 rounded-[50%] bg-[#111111d7]">
                    <h2>{item.market_cap_rank}</h2>
                  </div>
                </div>
              ))
            )}
          </div>
          {!loading && data.length ? (
            <div ref={ref} className="loading-wave">
              <div className="loading-bar"></div>
              <div className="loading-bar"></div>
              <div className="loading-bar"></div>
              <div className="loading-bar"></div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default App;
