import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import { AuthUserContext } from '../App'

function Footer(props) {
  
  const authData = useContext(AuthUserContext)

  return (
    authData.logged && props.pos !== 'unselected' ?
    <footer>
        <nav className='navigation'>
          <div className="links">
            <Link to='/home'>Dashboard</Link>
            <Link to='/club'>Club</Link>
            <Link to='/training'>Training</Link>
            <Link to='work'>Work</Link>
            <Link to='/shop'>Shop</Link>
            <Link to='/league'>League</Link>
          </div>
        </nav>
    </footer> : ''
  )
}

export default Footer