import {useState, useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import {AuthUserContext} from '../App'

function Register() {

  const authData = useContext(AuthUserContext)

  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')

  const [loading,setLoading] = useState(false);
  const [message,setMessage] = useState('');

  const navigate = useNavigate()

  useEffect(() => {
    setUsername('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setMessage('')
    console.log(authData.logged)
  },[])

  const onFormSubmitHandler = (e) => {
    e.preventDefault()
    console.log(username,email,password,confirmPassword)

    if(validation())
    {
      setLoading(true)
      fetch(process.env.REACT_APP_SERVER+'users/register',{
        method:"POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email,name:username,password})
      })
      .then(res => res.json())
      .then(res => {
        setLoading(false)
        console.log(res)
        if(res.message)
          setMessage(res.message)
        if(res.message === 'Success'){
          authData.setToken(res.data.token)
          authData.setLogged(true)
          localStorage.setItem('userToken',res.data.token)
          navigate('/')
        }
      })
      .catch(err => console.log('err',err))
    }
    else setMessage('Passwords are not the same')
  }

  const validation = () => {
    let validate = false
    if(password === confirmPassword)
      validate = true
    return validate
  }

  return (
    <main className='registerContent'>
      <h1 className='authHeader'>Join and win the league!</h1>
      <p>Create an account</p>
      <form className='authForm' onSubmit={onFormSubmitHandler}>
        <div className='formInputs'>
          <label>Username<input type='text' name='username' value={username} onChange={e => setUsername(e.target.value)}/></label>
          <label>Email <input type='email' name='email' value={email} onChange={e => setEmail(e.target.value)}/></label>
          <label>Password <input type='password' name='password' value={password} onChange={e => setPassword(e.target.value)}/></label>
          <label>Confirm password <input type='password' name='confirmPassword' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/></label>
        </div>
        <div className='formSubmit'>
          <input type='submit' value='Register'></input>
        </div>
        {loading ? <p className='authInfo'>Processing...</p> : message ? <p className='authInfo'>{message}</p> : ''}
      </form>
    </main>
  )
}

export default Register