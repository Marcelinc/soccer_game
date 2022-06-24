import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthUserContext } from "../App"
import PositionSelector from '../components/PositionSelector'
import User from "../components/User"
import '../css/Dashboard.css'

function Dashboard() {

  const UserContext = createContext()

  const authData = useContext(AuthUserContext)
  const [user,setUser] = useState({})
  const [userStats,setStats] = useState({})
  

  const [loading,setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    fetch('http://localhost:5000/api/users/me',{
      method:'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('userToken')
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
    .catch(err => {console.log(err); setLoading(false)})

    return(() => {
      setLoading(false)
    })

  },[])

  return (
      loading ? <div>Loading...</div> : 
      user.pos === "unselected" ? <PositionSelector/> : <main className="dashboard">
        <UserContext.Provider value={user}>
          <User/>
        </UserContext.Provider>
      </main>
  )
}

export default Dashboard