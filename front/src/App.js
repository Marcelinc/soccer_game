import './css/App.css';
import {useState, createContext, useEffect} from 'react'
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import Club from './pages/Club';
import League from './pages/League';
import Shop from './pages/Shop';
import Work from './pages/Work';
import Training from './pages/Training';
import Home from './pages/Home';
import Footer from './components/Footer';
import Page404 from './pages/Page404';

export const AuthUserContext = createContext()

function App() {

  const [token,setToken] = useState(localStorage.getItem('userToken'))
  const [logged,setLogged] = useState(false)

  const [user,setUser] = useState({})
  const [position,setPosition] = useState()
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    console.log('uwierzytelnianie')
    setLoading(true)
    fetch(process.env.REACT_APP_SERVER+'/users/me',{
      method:'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    })
    .then(res => res.json())
    .then(res => {
      //redirect to login
      if(res.message === 'Not authorized'){
        setLogged(false)
      }
      //set user data
      if(res.message === 'Success'){
        setUser(res.data)
        setPosition(res.data.pos)
        console.log(res.data)
        setLogged(true)
      }
      setLoading(false)
    })
    .catch(err => {console.log(err); setLoading(false);})
    console.log('koniec uwierzytelniania')
  },[token])
  
  return (
    !loading &&
    <Router>
      <div className='container'>
        <AuthUserContext.Provider value={{token,setToken,logged,setLogged,user}}>
        <Header />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/club' element={<Club />} />
          <Route path='/league' element={<League/>} />
          <Route path='/shop' element={<Shop/>}/>
          <Route path='/work' element={<Work/>}/>
          <Route path='/training' element={<Training/>}/>
          <Route path='/home' element={<Dashboard setPosition={setPosition} position={position}/>}/>
          <Route path='/404' element={<Page404/>}/>
        </Routes>
        <Footer pos={position}/>
        </AuthUserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
