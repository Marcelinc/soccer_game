import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthUserContext } from "../App"
import PositionSelector from '../components/PositionSelector'
import User from "../components/User"
import '../css/Dashboard.css'
import Page404 from "./Page404"

function Dashboard() {

  const UserContext = createContext()

  const authData = useContext(AuthUserContext)
  const [user,setUser] = useState({})
  const [userStats,setStats] = useState({})
  

  const [loading,setLoading] = useState(true)
  const [loadingError,setLoadingError] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    fetch(process.env.REACT_APP_SERVER+'/users/me',{
      method:'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
        
      }
    })
    .then(res => res.json())
    .then(res => {
      //redirect to login
      if(res.message === 'Not authorized'){
        authData.setLogged(false)
        navigate('/login')
      }
      //set user data
      if(res.message === 'Success'){
        setUser(res.data)
        console.log(res.data)
        authData.setLogged(true)
      }
      setLoading(false)
    })
    .catch(err => {console.log(err); setLoadingError(true); setLoading(false);})

    return(() => {
      setLoading(false)
    })

  },[])

  return (
      loading ? <div>Loading...</div> : loadingError ? <Page404/> : 
      user.pos === "unselected" ? <PositionSelector/> : <main className="dashboard">
        <UserContext.Provider value={user}>
          <User/>
        </UserContext.Provider>
      </main>
  )
}

export default Dashboard