import React, { useContext, useEffect } from 'react'
import UserContext from '../pages/Dashboard'

function User(props) {

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
      <section className='userLevel'>
        <div className='levelInfo'></div>
        <p className='levelNumb'>Level 1</p>
      </section>
      <section className='userInfo'>
        <div className='personalInfo'>
          <p className='infoField'>Nickname: {props.user.user.name}</p>
          <p className='infoField' id='country'>Country: {props.user.user.country}</p>
          <p className='infoField' id='age'>Age: {props.user.user.age}</p>
          <p className='infoField' id='description'>Description: {props.user.user.desc}</p>
        </div>
        <div className='playerInfo'>
          <p className='infoField'>Position: {props.user.pos}</p>
          <p className='infoField'>Club: none</p>
          <p className='infoField'>League: 1 League</p>
        </div>
      </section>
    </>
  )
}

export default User