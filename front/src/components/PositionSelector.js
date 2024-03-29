import {React, useContext} from 'react'
import { AuthUserContext } from "../App"

function PositionSelector(props) {

  const authData = useContext(AuthUserContext)

  const updatePosition = (e) => {
    e.preventDefault()
    fetch('http://localhost:5000/api/users/position',{
      method:'PUT',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({position:e.target.id})
    })
    .then(response => response.json())
    .then(res => {
      console.log(res);
      if(res.status === 'Successfully'){
        props.setPosition(e.target.id)
        authData.setUser(...[authData.user],authData.user.pos = e.target.id,authData.user.stats = res.data.stats, 
          authData.user.statsModel = res.data.statsModel)
      }
    })
    .catch(err => console.log(err))
  }

  return (
    <main className='positionSelector'>
      <h1>Choose your position</h1>
      <div className='positions'>
        <div className='pos-select' id='Goalkeeper' onClick={updatePosition}>Goalkeeper</div>
        <div className='pos-select' id='Defender' onClick={updatePosition}>Defender</div>
        <div className='pos-select' id='Midfielder' onClick={updatePosition}>Midfielder</div>
        <div className='pos-select' id='Striker' onClick={updatePosition}>Striker</div>
      </div>
    </main>
  )
}

export default PositionSelector