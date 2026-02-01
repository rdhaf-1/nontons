import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Category from './pages/Category';
import SearchPage from './pages/Search';

function App() {
  return (
    <Router>
      <div className="bg-darker min-h-screen text-white font-sans">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:detailPath" element={<Detail />} />
          <Route path="/category/:slug" element={<Category />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
        
        <footer className="bg-black py-8 mt-10 border-t border-gray-900 text-center text-gray-500 text-sm">
          <p>&copy; 2023 ZeldStream. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
