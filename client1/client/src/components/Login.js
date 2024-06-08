import React, { useState } from 'react'
import axios from '../axios'


export let newtoken = '';

export default function Login() {
  
  const initialState = {
    username:"",
    password:""
  }

  
const [token,setToken] = useState('')

const [display,setDisplay] = useState('');
  
const [data,setData]=useState(initialState)

const clearState = () => {
  setData({ ...initialState });
  setDisplay('')
};

let name,value;
const handleInput = (e)=>{
  name = e.target.name;
  value = e.target.value;
  
  setData({...data,[name]:value})
}

const submitLogin = async (e)=>{
  e.preventDefault();
  try{
    const res = await axios.post('/users/login',{
      username:data.username,
      password:data.password
    }
    )
    .then((res)=>{
      // console.log(res.data)
      setToken(res.data.token)
      newtoken=res.data.token
      setDisplay('Logged In Successfull !')
      console.log('Logged In Successfull !')
      
      
    })
    
  }
  catch(e){
    console.log(e);
  }
}

  return (
      <form >
      
    <div className='form-login'>
      <h1 className="login-head">Login Page</h1>
        <label htmlFor="username">Enter your Username : </label>
        <input type="text" name='username' placeholder=' Username' onChange={handleInput} id='username' value={data.username} />
        <label htmlFor="password">Enter your Password : </label>
        <input type="password" id='password' name='password' placeholder=' Password' onChange={handleInput} value={data.password} />
        <div className="form-btn">

        <input type="submit" className='delbtn' onClick={submitLogin} value='Login' />
        <input type="reset" className='delbtn' onClick={clearState} value='Reset' />
        </div>
        <h3>{display}</h3>
        </div>
      </form>
  )
}

