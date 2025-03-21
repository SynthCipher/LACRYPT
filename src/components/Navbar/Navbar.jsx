import React, { useContext } from 'react';
import { MdArrowOutward, MdZoomIn } from 'react-icons/md';
import { CoinContext } from '../../context/CoinContext';
import './Navbar.css';
import { Link } from 'react-router-dom';
function Navbar() {
  const { setCurrency } = useContext(CoinContext);
  const currencyHandler = (e) => {
    switch (e.target.value) {
      case 'usd': {
        setCurrency({ name: 'usd', symbol: '$' });
        break;
      }
      case 'eur': {
        setCurrency({ name: 'eur', symbol: '€' });
        break;
      }
      case 'inr': {
        setCurrency({ name: 'inr', symbol: '₹' });
        break;
      }
      default: {
        setCurrency({ name: 'inr', symbol: '₹' });
      }
    }
  };
  return (
    <div className="navbar flex items-center justify-between border-b-[2px] border-[#3C3C3C] px-[10%] py-[20px] text-white">
      <Link to={`/`}>
        {' '}
        <img
          //  className='w-10 h-10'
          src="https://i.postimg.cc/ZRJhK3C3/logo1.png"
          // src='https://i.postimg.cc/ZnJDbbwF/logo.png'
          // src='https://i.postimg.cc/mrmKgWyb/logo1.png'
          // src=''
          alt="LOGO"
          className="w-[max(3vw,40px)]"
        />
      </Link>
      {/* <ul className="flex list-none gap-[40px]">
       <Link to={`/`}> <li className="cursor-pointer">Home </li></Link>
        <li className="cursor-pointer">Features </li>
        <li className="cursor-pointer">Pricing </li>
        <li className="cursor-pointer">Blog </li>
      </ul> */}

      <div className="flex items-center gap-[max(1vw,12px)]">
        <select
          className="rounded-xl border-2 bg-transparent px-[8px] py-[5px] text-white"
          onChange={currencyHandler}
        >
          <option value="inr" className="bg-[#09005c]">
            INR
          </option>
          <option value="usd" className="bg-[#09005c] text-white">
            USD
          </option>
          <option value="eur" className="bg-[#09005c]">
            EUR
          </option>
        </select>

        {/* <button className="flex cursor-pointer items-center gap-[10px] rounded-[20px] border-none bg-white px-[25px] py-[10px] text-[15px] font-medium text-[#393939] ">
          Signin <MdArrowOutward />
        </button> */}
      </div>
    </div>
  );
}

export default Navbar;
