import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../pages/Dashboard'
import AgeForm from './AgeForm'
import CountryForm from './CountryForm'
import DescriptionForm from './DescriptionForm'

function User(props) {

  const [exp,setExp] = useState(props.user.user.exp)
  const [showCountryForm, setCountryForm] = useState(false)
  const [showAgeForm,setAgeForm] = useState(false)
  const [showDescForm,setDescForm] = useState(false)

  const showExp = (e) => {
    if (e.type === 'mouseover')
      document.querySelector('.levelNumb').innerHTML = 'Exp. '+ exp.exp+'/'+exp.level.maxExp
    if(e.type === 'mouseleave')
      document.querySelector('.levelNumb').innerHTML = 'Level '+exp.level.name  
  }

  useEffect(()=>{
    console.log(props.user.user.name)
  })

  return (
    <>
      <section className='userImg'>
        <div className='imageField'>
          <img src='#' alt='userImage'/>
        </div>
        <p className='nickname'>{props.user.user.name}</p>
      </section>
      <section className='userStats'>
        <div className='statsField'><p className='statsProgress'>Dribbling</p></div>
        <div className='statsField'><p className='statsProgress'>Tackling</p></div>
        <div className='statsField'><p className='statsProgress'>Passing</p></div>
        <div className='statsField'><p className='statsProgress'>Sprint</p></div>
        <div className='statsField'><p className='statsProgress'>Fitness</p></div>
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