import React, { useContext, useEffect, useState } from 'react';
import { CoinContext } from '../../context/CoinContext';
// import { useSearchParams } from 'react-router-dom';
import './Home.css';
import { Link } from 'react-router-dom';

function Home() {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState('');

  // Filter contacts based on the search input
  const inputHandler = (e) => {
    setInput(e.target.value);
    if (e.target.value === '') {
      setDisplayCoin(allCoin);
    }
  };

  const searchHandler = async (e) => {
    e.preventDefault();
    const filteredCoins = await allCoin.filter((item) =>
      item.name.toLowerCase().includes(input.toLowerCase()),
    );
    setDisplayCoin(filteredCoins);
  };

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  return (
    <div className="px-[10px] pt-0 pb-[30px] ">
      <div className="hero mx-auto my-[80px]  flex max-w-[600px] flex-col items-center gap-[30px] text-center text-white">
        <h1 className="text-center text-[max(5vw,50px)]! leading-tight font-bold text-[#ffffff]">
          {/* Welcome <br /> to   */}
          {/* <span className='text-base mt-0 '>Ladakh’s Crypto Revolution</span> */}
          <span className='text-lg italic mt-0'>Empowering Ladakh with Crypto</span>

          <br />LACRYPT <br /> 
        </h1>
        {/* <p className="mx-auto mt-4 w-[80%] text-center font-[#d1d1d1] text-lg leading-relaxed">
          Explore the future of finance with LACRYPT. 
        </p> */}

        <form
          onSubmit={searchHandler}
          className="input flex w-[80%] items-center justify-between gap-[10px] rounded-lg bg-white p-2.5 text-[20px]"
        >
          <input
            type="text"
            required
            onChange={inputHandler}
            value={input}
            list="coinlist"
            placeholder="Search cryto.."
            className="flex-grow rounded-none pl-[10px] text-base text-black outline-none "
          />
         <datalist id="coinlist" className="appearance-none"> 
  {allCoin.map((item, index) => (
    <option key={index} value={item.name} />
  ))}
</datalist>

          <button className="cursor-pointer rounded-lg border bg-[#7927ff] px-[30px] py-[10px] text-base text-white">
            Search
          </button>
        </form>
        {/* </div> */}
      </div>

      <div className="m-auto max-w-[800px] rounded-[15px] bg-gradient-to-b from-[rgba(84,3,255,0.15)] to-[rgba(105,2,153,0.15)] text-white">
        <div className="table-layout grid grid-cols-[0.5fr_2fr_1.5fr_1fr_1.5fr] items-center border-b-[1px] border-[#3c3c3c] p-[15px_20px]">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p className="text-center">24H Change</p>
          <p className="market-cap text-right">Market Cap</p>
        </div>
        {displayCoin.slice(0, 10).map((item, index) => (
          <Link
            to={`/coin/${item.id}`}
            key={index}
            className={`table-layout grid grid-cols-[0.5fr_2fr_1.5fr_1fr_1.5fr] items-center p-[15px_20px] ${index === displayCoin.slice(0, 10).length - 1 ? ' ' : 'border-b-[1px] border-[#3c3c3c]'}`}
          >
            <p>{item.market_cap_rank}</p>
            <div className="flex items-center gap-2">
              <img src={item.image} alt="" className="w-[35px]" />
              <p>
                {item.name} - {item.symbol}
              </p>
            </div>
            <p>
              {currency.symbol} {item.current_price.toLocaleString()}
            </p>
            <p
              className={`text-center ${Math.floor(item.price_change_percentage_24h * 100) / 100 <= 0 ? 'text-red-600' : 'text-green-500'} `}
            >
              {Math.floor(item.price_change_percentage_24h * 100) / 100}
            </p>
            <p className="market-cap text-right">
              {currency.symbol} {item.market_cap.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
