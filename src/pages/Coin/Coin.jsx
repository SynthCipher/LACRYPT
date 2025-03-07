import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CoinContext } from '../../context/CoinContext';
import LineChart from '../../components/LineChart/LineChart';
function Coin() {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState();
  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-NNnCGwdFHxeEyE4Q2cWGfNDk',
      },
    };

    await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then((res) => res.json())
      .then((res) => setCoinData(res))
      .catch((err) => console.error(err));
  };

  const fetchHistoricalData = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-NNnCGwdFHxeEyE4Q2cWGfNDk',
      },
    };

    await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
      options,
    )
      .then((res) => res.json())
      .then((res) => setHistoricalData(res))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [currency]);

  if (coinData && historicalData) {
    return (
      <div className="px-[20px]">
        <div className='flex flex-col items-center gap-[20px] my-[100px] mt-[50px] mx-auto mb-[50px] text-white '>
          <p>
            <img src={coinData.image.large} className='max-w-[100px]' alt="icon-crypto" />
          </p>
          <p className='text-[44px] font-medium'>
            {coinData.name} ({coinData.symbol.toUpperCase()})
          </p>
        </div>
        <div className="coin-chart max-w-[600px] h-[250px] m-auto">
          <LineChart historicalData={historicalData} />
        </div>

        <div className="coin-info max-w-[600px] my-[50px] mx-auto flex flex-col text-white ">
          <ul className='flex justify-between py-[10px] px-0 border-b border-b-[#5f5d5f]'>
            <li> Crypto Market Rank</li>
            <li>{coinData.market_cap_rank}</li>
            </ul>
            <ul className='flex justify-between py-[10px] px-0 border-b border-b-[#5f5d5f]'>
            <li> Current Price</li>
            <li>
              {currency.symbol}{' '}
              {coinData.market_data.current_price[
                currency.name
              ].toLocaleString()}
            </li>

            </ul>

            <ul className='flex justify-between py-[10px] px-0 border-b border-b-[#5f5d5f]'>
            <li>Market Cap</li>
            <li>
              {currency.symbol}{' '}
              {coinData.market_data.market_cap[currency.name].toLocaleString()}
            </li>
            </ul>
            <ul className='flex justify-between py-[10px] px-0 border-b border-b-[#5f5d5f]'>
            <li> 24 Hour high</li>
            <li>
              {currency.symbol}{' '}
              {coinData.market_data.high_24h[currency.name].toLocaleString()}
            </li>
            </ul>
            <ul className='flex justify-between py-[10px] px-0 border-b border-b-[#5f5d5f]'>
            <li> 24 Hour low</li>
            <li>
              {currency.symbol}{' '}
              {coinData.market_data.low_24h[currency.name].toLocaleString()}
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="grid min-h-[80vh] place-items-center">
        <div className="h-[65px] w-[65px] animate-spin self-center rounded-[50%] border-[5px] border-[#bdbdbd] border-t-[#4500cb]"></div>
      </div>
    );
  }
}

export default Coin;
