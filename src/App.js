
import { Form } from 'react-router-dom';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './views/Home';
import Search from './views/Search';
import Plan from './views/Plan';
import Exercise from './views/Exercise';
// import Checkout from './views/Checkout';






function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
      <Route children path='/' element={<Home />} />
      <Route children path='/shop' element={<Search />} />
      <Route children path='/cart' element={<Plan />} />
      <Route children path='/Exercise/:exerciseId' element={<Exercise />} />
      {/* <Route children path='/checkout' element={<Checkout />} /> */}
      
      
      
      
      </Routes>
      
    </div>
  );
}

export default App;