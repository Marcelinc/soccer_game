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
            <div className="links">
              <Link to='/'>Home</Link>
              {!authData.logged ? <>
                <Link to='/login'>Login</Link>
                <Link to='/register'>Register</Link> 
              </> : <>
                <div id="moneyinfo">
                  <p className="moneyslot"><span className="moneystars">Money: </span><span id="moneystatus">10000$</span></p>
                  <p className="moneyslot"><span className="moneystars">Stars: </span><span id="starsstatus">15</span></p>
                </div>
                <Link to='/login' onClick={logout}>Logout</Link>
              </>}
            </div>
        </nav>
    </header>
  )
}

export default Header