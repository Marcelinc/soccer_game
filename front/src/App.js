import './css/App.css';
import {useState, createContext} from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import Club from './pages/Club';
import League from './pages/League';
import Shop from './pages/Shop';
import Work from './pages/Work';
import Training from './pages/Training';

export const AuthUserContext = createContext()

function App() {

  const [token,setToken] = useState('')
  const [logged,setLogged] = useState(false)
  
  return (
    <Router>
      <div className='container'>
        <AuthUserContext.Provider value={{token,setToken,logged,setLogged}}>
        <Header />
        <Routes>
          <Route path='/' element={<Dashboard/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/club' element={<Club />} />
          <Route path='/league' element={<League/>} />
          <Route path='/shop' element={<Shop/>}/>
          <Route path='/work' element={<Work/>}/>
          <Route path='/training' element={<Training/>}/>
        </Routes>
        </AuthUserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
