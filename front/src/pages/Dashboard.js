import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthUserContext } from "../App"
import PositionSelector from '../components/PositionSelector'
import User from "../components/User"
import '../css/Dashboard.css'
import Page404 from "./Page404"

function Dashboard(props) {

  const authData = useContext(AuthUserContext)
  const [user,setUser] = useState()
  
  const [loading,setLoading] = useState(true)
  const [loadingError,setLoadingError] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    !authData.logged && navigate('/login')
    setUser(authData.user)
    setLoading(false)
  },[])

  return (
      loading ? <div>Loading...</div> : loadingError ? <Page404/> : 
      props.position === "unselected" ? <PositionSelector setPosition={props.setPosition}/> : <main className="dashboard">
          <User user={user}/>
      </main>
  )
}

export default Dashboard