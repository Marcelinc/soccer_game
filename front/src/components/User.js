import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../pages/Dashboard'
import AgeForm from './AgeForm'
import CountryForm from './CountryForm'
import DescriptionForm from './DescriptionForm'

function User(props) {

  const [exp,setExp] = useState(props.user.user.exp)
  const [stats,setStats] = useState(props.user.user.stats)
  const [showCountryForm, setCountryForm] = useState(false)
  const [showAgeForm,setAgeForm] = useState(false)
  const [showDescForm,setDescForm] = useState(false)

  const showExp = (e) => {
    if (e.type === 'mouseover')
      document.querySelector('.levelNumb').innerHTML = 'Exp. '+ exp.exp+'/'+exp.level.maxExp
    if(e.type === 'mouseleave')
      document.querySelector('.levelNumb').innerHTML = 'Level '+exp.level.name  
  }

  const showStatPoints = (e) => {
    let id = true
    if(e.target.id !== 'stat1' && e.target.id !== 'stat2' && e.target.id !== 'stat3' && e.target.id !== 'stat4' && e.target.id !== 'stat5')
      id=null
    if(e.type === 'mouseover' && id)
      document.getElementById(e.target.id).innerHTML = stats[e.target.id].value+'/'+stats.level.maxPoints
    if(e.type === 'mouseleave' && id)
      document.getElementById(e.target.id).innerHTML = stats[e.target.id].name
    //console.log('Id ',id)
  }

  useEffect(()=>{
    console.log(props.user.user.name)
  },[])

  return (
    <>
      <section className='userImg'>
        <div className='imageField'>
          <img src='#' alt='userImage'/>
        </div>
        <p className='nickname'>{props.user.user.name}</p>
      </section>
      <section className='userStats'>
        <div className='statsField'>
          <p className='statsProgress' id='stat1' style={{width: (stats.stat1.value*100)/stats.level.maxPoints}}
          onMouseOver={showStatPoints} onMouseLeave={showStatPoints}>
            {stats.stat1.name}
          </p>
        </div>
        <div className='statsField'>
          <p className='statsProgress' id='stat2' style={{width: (stats.stat2.value*100)/stats.level.maxPoints}}
          onMouseOver={showStatPoints} onMouseLeave={showStatPoints}>
            {stats.stat2.name}
          </p>
        </div>
        <div className='statsField'>
          <p className='statsProgress' id='stat3' style={{width: (stats.stat3.value*100)/stats.level.maxPoints}}
          onMouseOver={showStatPoints} onMouseLeave={showStatPoints}>
            {stats.stat3.name}
          </p>
        </div>
        <div className='statsField'>
          <p className='statsProgress' id='stat4' style={{width: (stats.stat4.value*100)/stats.level.maxPoints}}
          onMouseOver={showStatPoints} onMouseLeave={showStatPoints}>
            {stats.stat4.name}
          </p>
        </div>
        <div className='statsField'>
          <p className='statsProgress' id='stat5' style={{width: (stats.stat5.value*100)/stats.level.maxPoints}}
          onMouseOver={showStatPoints} onMouseLeave={showStatPoints}>
            {stats.stat5.name}
          </p>
        </div>
      </section>
      <section className='userEquipment'>
        <div className='eqField'>eq1</div>
        <div className='eqField'>eq2</div>
        <div className='eqField'>eq3</div>
        <div className='eqField'>eq4</div>
      </section>
      <section className='userLevel' onMouseOver={showExp} onMouseLeave={showExp}>
        <div className='levelInfo' style={{width: exp.exp*100/exp.level.maxExp+'%'}}></div>
        <p className='levelNumb'>Level {exp.level.name}</p>
      </section>
      <section className='userInfo'>
        <div className='personalInfo'>
          <p className='infoField'>Nickname: {props.user.user.name}</p>
          <p className='infoField' >Country: <span id='country' onClick={()=> setCountryForm(true)}>{props.user.user.country.name}</span></p>
          <p className='infoField' >Age: <span id='age' onClick={() => setAgeForm(true)}>{props.user.user.age} Years</span></p>
          <p className='infoField' >Description: <span id='description' onClick={() => setDescForm(true)}>{props.user.user.desc ? props.user.user.desc : 'Set your description..'}</span></p>
        </div>
        <div className='playerInfo'>
          <p className='infoField'>Position: {props.user.pos}</p>
          <p className='infoField'>Club: none</p>
          <p className='infoField'>League: 1 League</p>
        </div>
      </section>
      {showCountryForm && <CountryForm setForm={setCountryForm}/>}
      {showAgeForm && <AgeForm setForm={setAgeForm}/>}
      {showDescForm && <DescriptionForm setForm={setDescForm}/>}
    </>
  )
}

export default User