import React, { useEffect, useState } from 'react'

function CountryForm(props) {

    const [loading,setLoading] = useState(true)
    const [countries,setCountries] = useState([])
    const [choosenCountry,setChoosen] = useState()

  useEffect(() => {
    fetch(process.env.REACT_APP_SERVER+'/country/getAll',{
        headers: {'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then(res => {console.log(res); setCountries(res.country)})
    .catch(err => console.log(err))
    setLoading(false)
  },[])

  const setCountry = () => {
    console.log(choosenCountry)
  }

  return (
    <div className='userForm'>
        {loading ? <p>Loading data</p> : <>
            <p>Choose country</p>
            <select value={choosenCountry} onChange={e => setChoosen(e.target.value)}>
                {countries.map((c,index) => <option disabled={index ? false : true} hidden={index ? false : true} selected={index ? false : true} key={c.name}>{c.name}</option>)}
            </select>
            <button onClick={setCountry}>Save</button>
        </>}
        
    </div>
  )
}

export default CountryForm