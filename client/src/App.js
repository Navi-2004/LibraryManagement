import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import UserLogin from './components/UserLogin';
import Book from './components/Book';
import Entry from './components/Entry';
import UserRegister from './components/UserRegister';

function App() {
  return (
    <div className="App">
      <Router>
  <Routes>
    <Route path="/admin" element={<AdminLogin />} />
    <Route path="/book" element={<Book />} />
    <Route path="/" element={<UserLogin />} />
    <Route path='/entry' element={<Entry />} />
    <Route path='/register' element={<UserRegister />} />
  </Routes>
</Router>
    </div>
  );
}

export default App;
