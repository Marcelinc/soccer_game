import React, { useContext } from 'react'
import UserContext from '../pages/Dashboard'

function User() {

  const user = useContext(UserContext)

  return (
    <>
      <section className='userImg'>
        <div className='imageField'>
          <img src='#' alt='userImage'/>
        </div>
        <p className='nickname'>{user.name}</p>
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
          <p className='infoField'>Nickname: Marcelinc</p>
          <p className='infoField'>Country: Poland</p>
          <p className='infoField'>Age: 01</p>
          <p className='infoField'>Description: xddd</p>
        </div>
        <div className='playerInfo'>
          <p className='infoField'>Position: Defender</p>
          <p className='infoField'>Club: none</p>
          <p className='infoField'>League: 1 League</p>
        </div>
      </section>
    </>
  )
}

export default User