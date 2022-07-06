import React, { useEffect, useState, useContext } from 'react'
import { AuthUserContext } from "../App"

function CountryForm(props) {

  const authData = useContext(AuthUserContext)

    const [loading,setLoading] = useState(true)
    const [countries,setCountries] = useState([])
    const [choosenCountry,setChoosen] = useState()
    const [proccessing,setProccessing] = useState(false)

    const [token,setToken] = useState(localStorage.getItem('userToken'))

  useEffect(() => {
    fetch(process.env.REACT_APP_SERVER+'/country/getAll',{
        headers: {'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then(res => {console.log(res); setCountries(res.country); setChoosen(res.country[1].name)})
    .catch(err => console.log(err))
    setLoading(false)
  },[])

  const setCountry = () => {
    setProccessing(true)
    console.log(choosenCountry)
    fetch(process.env.REACT_APP_SERVER+'/users/country',{
      method: 'PUT',
      headers: {'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token},
      body: JSON.stringify({country:choosenCountry})
    })
    .then(res => res.json())
    .then(res => {if(res === 'User updated') {console.log(authData.user); authData.setUser(...[authData.user],authData.user.user.country.name = choosenCountry)}
      props.setForm(false)})
    .catch(err => console.log(err))
    setProccessing(false)
  }

  const backToPage = () => {
    props.setForm(false)
  }

  return (
    <div className='formWindow'>
      <div className='form'>
        {loading ? <p>Loading data</p> : <>
            <p>Choose country</p>
            <select className='formElem' value={choosenCountry} onChange={e => setChoosen(e.target.value)}>
                {countries.map((c,index) => <option disabled={index ? false : true} hidden={index ? false : true}
                key={c.name}>{c.name}</option>)}
            </select>
            <button className='formElem' onClick={setCountry} disabled={proccessing?true:false}>{proccessing ? 'Processing..' : 'Save'}</button>
            <div id='closeButt' onClick={backToPage}>
              <span id='closeLeft'></span>
              <span id='closeRight'></span>
            </div>
        </>}
      </div>
    </div>
  )
}

export default CountryForm