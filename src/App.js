
import { Form } from 'react-router-dom';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './views/Home';
import Exercises from './views/Exercises';
import Plan from './views/Plan';
import Register from './components/Register'







function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
      <Route children path='/' element={<Home />} />
      <Route children path='/exercises' element={<Exercises/>} />
      <Route children path='/cart' element={<Plan />} />
      {/* <Route children path='/checkout' element={<Checkout />} /> */}
      <Route children path='/register' element={<Register />} />
      
      
      
      </Routes>
      
    </div>
  );
}

export default App;