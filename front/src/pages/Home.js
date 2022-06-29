import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthUserContext } from '../App'

function Home() {

  const authData = useContext(AuthUserContext)
  const navigate = useNavigate()

  useEffect(() => {
    authData.logged && navigate('/home')
  },[])

  

  return (
    <div>Home</div>
  )
}

export default Home