import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Coin from './pages/Coin/Coin';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-[#0b004e] via-[#1d152f] to-[#002833]">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coin/:coinId" element={<Coin />} />
        </Routes>
        <Footer/>
      </div>
    </>
  );
}

export default App;
