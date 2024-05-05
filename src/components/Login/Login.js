import { Link } from 'react-router-dom'
import { compareSync } from 'bcryptjs'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import React from 'react'
import './Login.css'

function Login() {
    let navigate=useNavigate();
    let [errorMessage,changeErrorMessage]=useState()
    let [userName,changeUserName]=useState()
    let [password,changePassword]=useState()
    function LoginFunction(event)
    {
        event.preventDefault();
        console.log(userName,password)
        fetch(`https://blog-project-backend-l4o8.onrender.com/users/getUsers/?user_name=${userName}`).then(data=>data.json())
        .then((data)=>{
            data=data.payload;
            console.log(data[0])
            if(data.length==0){alert("invalid username")}
            else
            {
                if(compareSync(password,data[0].Password_in))
                {
                    document.cookie = `blogAppUserName = ${userName}`
                    alert("you got it");navigate("/Main",);
                }
                else
                {
                    alert("invalid password")
                }
            }
    
        })
    }
  return (
    <div>
        <h3>Home</h3>
        <div className='row'>
            <div className='col-lg-4'></div>
            <div className='col-lg-4'>
                <center>
                    <span className='errorMessageSpan'>
                    <p className='errorMessage text-danger'>{errorMessage}</p>
                    </span>
                    <form className='FormDiv'>
                        <input className='usernameInput' type='test' placeholder='Username' onChange={(event)=>{changeUserName(event.target.value)}}/><br/>
                        <input className='passwordInput' type='password' placeholder='Password' onChange={(event)=>{changePassword(event.target.value)}}/><br/>
                        <button className='SubmiButton' onClick={LoginFunction}>Continue</button>
                    </form>
                </center>
                <div className='row'>
                    <div className='col-lg-6'>
                        <Link className='text-danger btn btn-warning m-2' to="/SignIn">Sign in</Link>
                    </div>
                    <div className='col-lg-6'>
                        <Link className='text-danger btn btn-warning m-2' to="/ForgotPassword">forgot password</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login