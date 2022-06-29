import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthUserContext } from "../App";


function Login() {

  const authData = useContext(AuthUserContext)

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const [loading,setLoading] = useState(false)
  const [message,setMessage] = useState('')

  const navigate = useNavigate()

  useEffect(()=>{

    authData.logged && navigate('/home') 

    return(() => {
      setMessage('')
      setLoading(false)
    })
  },[])

  const onFormSubmitHandler = (e) => {
    e.preventDefault(); 
    if(validation()){
      setMessage('Logging...')
      setLoading(true)  
      fetch(process.env.REACT_APP_SERVER+'/users/login',{
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({email,password})
      })
      .then(res => res.json())
      .then(res => {
        if(res.message === 'Success'){
          setMessage(res.message)
          localStorage.setItem('userToken',res.data.token)
          authData.setToken(res.data.token)
          authData.setLogged(true)
          navigate('/home')
        }
        if(res.message === 'Invalid credentials')
          setMessage('User not found')
      })
      .catch(err => {console.log(err); setMessage('Login failed. Try later')})
    } else setMessage('Please enter data')
  }

  const validation = () => {
    let validate = true

    if(email === '')
      validate = false

    if(password === '')
      validate=false

    return validate
  }

  return (
    <main className='registerContent'>
      <h1 className='authHeader'>Log in</h1>
      <form className='authForm' onSubmit={onFormSubmitHandler}>
        <div className='formInputs'>
          <label>Email <input type='email' name='email' value={email} onChange={e => setEmail(e.target.value)}/></label>
          <label>Password <input type='password' name='password' value={password} onChange={e => setPassword(e.target.value)}/></label>
        </div>
        <div className='formSubmit'>
          <input type='submit' value='Log in'></input>
        </div>
        <p className='authInfo'>{message}</p>
      </form>
    </main>
  )
}

export default Login