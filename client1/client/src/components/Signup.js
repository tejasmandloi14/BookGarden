import React from 'react'
import axios from '../axios'
import { useState } from 'react';

export default function Signup() {

    const[display,setDisplay]=useState('')

    const initialState = {
        username: "",
        password: "",
        firstname: "",
        lastname: ""
    };

    const [data, setData] = useState({
        username: '', password: '', firstname: '', lastname: ''
    });


    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;

        setData({ ...data, [name]: value })
    }

    const clearState = () => {
        setData({ ...initialState });
        setDisplay('')
      };

    const submitInfo = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/users/signup', {
                username: data.username,
                password: data.password,
                firstname: data.firstname,
                lastname: data.lastname
            }
            )
            .then((res)=>console.log(res))
                .then((res) => console.log("Signup Successfull !"));
                setDisplay('SignUp Successfull !')
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='signUp'>
            <h1>SignUp Page</h1>
            <form className='form-signup'>
                <label htmlFor="username">Enter your Username : </label>
                <input placeholder=' Username' type="text" onChange={handleInputs} name='username' id='username' />
                <label htmlFor="password">Enter your Password : </label>
                <input placeholder=' Password' type="password"  onChange={handleInputs} name='password' id='password' />
                <label htmlFor="fname">Enter your First Name : </label>
                <input placeholder=' First name' type="text"  onChange={handleInputs} name='firstname' id='fname' />
                <label htmlFor="lname">Enter your Last Name : </label>
                <input placeholder=' Last name' type="text" id='lname'  onChange={handleInputs} name='lastname' />
                <div className="form-btn">

                    <input type="submit" className='delbtn' onClick={submitInfo} value='Submit' />
                    <input type="reset" value='Reset' className='delbtn' onClick={clearState} />
                </div>
                <h3>{display}</h3>
            </form>
        </div>
    )
}
