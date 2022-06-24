import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthUserContext } from "../App"

function Header() {

  const authData = useContext(AuthUserContext)

  const logout = () => {
    if(localStorage.getItem('userToken'))
      localStorage.removeItem('userToken')
    authData.setLogged(false)
    authData.setToken('')
  }

  return (
    <header>
        <nav className="navigation">
            <Link to='/'>Dashboard</Link>
            <div className="links">
              {!authData.logged && !authData.token ? <>
                <Link to='/login'>Login</Link>
                <Link to='/register'>Register</Link> 
                </>  : <>
                  <Link to='/club'>Club</Link>
                  <Link to='/training'>Training</Link>
                  <Link to='work'>Work</Link>
                  <Link to='/shop'>Shop</Link>
                  <Link to='/league'>League</Link>
                  <Link to='/login' onClick={logout}>Logout</Link>
                </>}
            </div>
        </nav>
    </header>
  )
}

export default Header