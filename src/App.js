
import { Form } from 'react-router-dom';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './views/Home';
import Exercises from './views/Exercises';
import Register from './components/Register'
import Login from './components/Login';







function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
      <Route children path='/' element={<Home />} />
      <Route children path='/exercises' element={<Exercises/>} />
      <Route children path='/register' element={<Register />} />
      <Route children path='/login' element={<Login />} />
      </Routes>
      
    </div>
  );
}

export default App;