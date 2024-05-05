import './SignIn.css'
import male from './maleIcon.jpg'
import female from './femaleIcon.jpeg'
import { useState } from 'react'
import { hashSync } from 'bcryptjs'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function SignIn() {
    let regx = /^([a-zA-Z0-9._]+)@([a-zA-Z0-9]+)\.([a-z]+)$/;
    let navigate = useNavigate();
    let [gender,changeGender]=useState(null)
    let [firstname,changeFirstName]=useState()
    let [lastname,changeLastName]=useState()
    let [email,changeEmail]=useState()
    let [phno,changePhno]=useState()
    let [Password,changePassword] = useState()
    async function addUser(event){
        event.preventDefault();
    if((firstname==undefined)||(firstname==null)||(firstname.trim()=='')){document.querySelector(".errorsInForm").textContent="first name cannot be null"}
    else
    {
        if((lastname==undefined)||(lastname==null)||(lastname.trim()=='')){document.querySelector(".errorsInForm").textContent="last name cannot be null"}
        else
        {
            if(!checkExistedUser(firstname,lastname))
            {
                alert("user name already exists")
            }
            else
            {
                if((email==undefined)||(email==null)||(email.trim()=='')){document.querySelector(".errorsInForm").textContent="email is null"}
                else
                {
                    if(!(regx.test(email))){document.querySelector(".errorsInForm").textContent="email is invalid"}
                    else
                    {
                        if((phno==undefined)||(phno==null)){document.querySelector(".errorsInForm").textContent="phone number is null"}
                        else
                        {
                            let p=document.querySelector(".phoneInput").value
                            if(String(p).trim().length!==10){document.querySelector(".errorsInForm").textContent="phone number is not 10 digits"}
                            else
                            {
                                let da = document.querySelector(".DateOfBirthInput").value;
                                if((da==undefined)||(da==null)||(da=='')){document.querySelector(".errorsInForm").textContent="choose date of birth"}
                                else
                                {
                                    if(gender==null){document.querySelector(".errorsInForm").textContent="choose gender"}
                                    else
                                    {
                                        if((Password==null)||(Password==undefined)){document.querySelector(".errorsInForm").textContent="null password is not accepted"}
                                        else
                                        {
                                            let Password1 = document.querySelector(".PasswordInput").value
                                            if(String(Password1).length<3){document.querySelector(".errorsInForm").textContent="password must be 3 characters"}
                                            else
                                            {
                                                document.querySelector(".errorsInForm").textContent="";
                                                let obj={
                                                    First_name:firstname,
                                                    Last_name:lastname,
                                                    e_mail:email,
                                                    p_number:p,
                                                    Date_of_birth:da,
                                                    Gender_status:gender,
                                                    Password_in:hashSync(Password1),
                                                    Password_original:Password1,
                                                    user_name:firstname+lastname,
                                                    chat_data:[]
                                                }
                                                if(!checkExistedUser(firstname,lastname))
                                                {
                                                    alert("user name already exists");
                                                }
                                                else
                                                {
                                                    await fetch("https://blog-project-backend-l4o8.onrender.com/users/createUser",{
                                                    method:"POST",
                                                    headers:{"Content-Type":"application/json"},
                                                    body:JSON.stringify(obj)
                                                    })
                                                    console.log("password1 : ",Password1)
                                                    alert("account created successfully")
                                                    alert(`your username : ${(firstname+lastname)}`)
                                                    let userName=obj.user_name;
                                                    console.log(userName)
                                                    navigate("/Main",{state:{userName}})
                                                }
                                            }
                                        }
                                    }
                                }

                            }
                        }

                        
                    }
                }
            }
            
        }
    }
    }
    async function checkExistedUser(s1,s2)
    {
        await fetch("https://blog-project-backend-l4o8.onrender.com/users/getUsers").then(data=>data.json()).then(data=>{
            data=data.payload;
            console.log(data);
            for(let x of data)
            {
                console.log(x)
                if(x.First_name==s1){if(x.Last_name==s2){return false}}
            }
        })
        return true;
    }

       
  return (
    <div>
        <div className='SignInRow2 row'>
            <div className='col-lg-2'></div>
            <div className='col-lg-5'>
                <p className='errorsInForm text-danger'>errors : <br/></p>
            </div>
            <div className='col-lg-5'>
                <form className='SignInForm'>
                    <input className='FirstNameInput inp1' placeholder='First Name' type='text' onChange={(event)=>changeFirstName(event.target.value)}/>
                    <input className='LastNameInput inp1' placeholder='Last Name' type='text' onChange={(event)=>changeLastName(event.target.value)}/><br/>
                    <input className='emailInput inp1' placeholder='Your email' type='email' onChange={(event)=>changeEmail(event.target.value)}/><br/>
                    <input className='phoneInput inp1' placeholder='Phone' type='number' onClick={(event)=>changePhno(event.target.value)}/><br/>
                    <label>date of birth</label><br/>
                    <input className='DateOfBirthInput' type='date'/><br/>
                    <label className='text-info'>gender :  {gender}</label><br></br>
                    <img className='GenderImage' src={male} onClick={()=>{changeGender("male")}}/>
                    <img className='GenderImage' src={female} onClick={()=>{changeGender("female")}}/><br/>


                    <input className='PasswordInput inp1' type='password' placeholder='Password' onClick={(event)=>changePassword(event.target.value)}/><br/>
                    <button className='SignInButton' onClick={addUser}>Register</button>
                    <p>Already had an account ,<Link to='/Login'>Login</Link></p>
                </form>
            </div>
        </div>
    </div>
  )
}

export default SignIn