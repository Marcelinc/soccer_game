import React, { useEffect, useState, useContext } from 'react'
import { AuthUserContext } from "../App"

function AgeForm(props) {

    const [loading,setLoading] = useState(true)
    const [proccessing,setProccessing] = useState(false)
    const [token,setToken] = useState(localStorage.getItem('userToken'))

    const [choosenAge,setChoosenAge] = useState()
    const authData = useContext(AuthUserContext)

    useEffect(() => {
      setLoading(true)
      setChoosenAge(authData.user.user.age)
      setLoading(false)
    },[authData.user.user.age])

    const setAge = () => {
      console.log(choosenAge)
      setProccessing(true)
      fetch(process.env.REACT_APP_SERVER+'/users/age',{
        method: 'PUT',
        headers: {'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token},
        body: JSON.stringify({age:choosenAge})
      })
      .then(res => res.json(res))
      .then(res => {console.log(res); if(res==='User updated') {
        authData.setUser(...[authData.user],authData.user.user.age=choosenAge);
        props.setForm(false)
      }})
      .catch(err => console.log(err))
    }

    const backToPage = () => {
      props.setForm(false)
    }

  return (
    <div className='formWindow'>
    <div className='form'>
      {loading ? <p>Loading form</p> : <>
          <p>Choose age</p>
          <input className='formElem' type='number' min={1} defaultValue={choosenAge} onChange={e => setChoosenAge(e.target.value)}></input>
          <button className='formElem' onClick={setAge} disabled={proccessing?true:false}>{proccessing ? 'Processing..' : 'Save'}</button>
          <div id='closeButt' onClick={backToPage}>
            <span id='closeLeft'></span>
            <span id='closeRight'></span>
          </div>
      </>}
    </div>
  </div>
  )
}

export default AgeForm