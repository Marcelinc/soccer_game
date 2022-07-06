import React, { useContext, useEffect, useState } from 'react'
import { AuthUserContext } from '../App'

function DescriptionForm(props) {

    const authData = useContext(AuthUserContext)
    const [description,setDescription] = useState()
    const [proccessing,setProccessing] = useState(false)
    const [loading,setLoading] = useState(false)
    const [token,setToken] = useState(localStorage.getItem('userToken'))

    useEffect(() => {
        setDescription(authData.user.user.desc)
    },[authData.user.user.desc])

    const setDesc = () => {
        console.log(description)
        setProccessing(true)
        fetch(process.env.REACT_APP_SERVER+'/users/desc',{
            method: 'PUT',
            headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token},
        body: JSON.stringify({description:description})
        })
        .then(res => res.json())
        .then(res => {console.log(res); if(res === 'User updated') {
            authData.setUser(...[authData.user],authData.user.user.desc = description);
            props.setForm(false)
        }})
        .catch(err => console.log(err))
        setProccessing(false)
    }

    const backToPage = () => {
        props.setForm(false)
    }

  return (
    <div className='formWindow'>
    <div className='form'>
      {loading ? <p>Loading form</p> : <>
          <p>Enter your description</p>
          <textarea id='descInput' className='formElem' rows={1} cols={30} maxLength={50} value={description} onChange={e => setDescription(e.target.value)}></textarea>
          <button className='formElem' onClick={setDesc} disabled={proccessing?true:false}>{proccessing ? 'Processing..' : 'Save'}</button>
          <div id='closeButt' onClick={backToPage}>
            <span id='closeLeft'></span>
            <span id='closeRight'></span>
          </div>
      </>}
    </div>
  </div>
  )
}

export default DescriptionForm