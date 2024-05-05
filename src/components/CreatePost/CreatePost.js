import React, { useState } from 'react'
import { useNavigate,useLocation } from 'react-router-dom';
import './CreatePost.css'

function CreatePost() {
    
    let navigate = useNavigate();
    let [postData,updatePostData]=useState();
    let [user,changeUser]=useState();
    let [error,updateError]=useState();

    function postData_to_server(event)
    {
        event.preventDefault();

        if(!user)
        {
            updateError('* invalid username *');
        }
        else
        {
            if(!postData)
            {
                updateError('* null article cannot be publishied *')
            }
            else
            {
                fetch("https://blog-project-backend-l4o8.onrender.com/posts/newPost",
                {
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify({
                        author:user,
                        body:postData,
                        views:0
                    })
                }).then(res=>{console.log(res);
                    alert("your article published");
                    navigate('/Main')})
                .catch(err=>{console.log(err)
                alert("your article not published,due to some server error")})

            }
        }
        
    }

  return (
    <div>
        <div className='row'>
            <div className='col-lg-3'></div>
           <form className='postArea col-lg-4'>
                <input className='m-1 border border-primary' onChange={(event)=>{changeUser(event.target.value)}} type='text' placeholder='author'></input>
                <br/>
                <p>{error}</p>
                <br/>
                <textarea className='articletextfield m-1 border border-danger' onChange={(event)=>{updatePostData(event.target.value)}}></textarea>

                <br/><br/>
                <button onClick={(event)=>{postData_to_server(event)}} className='btn btn-success'>Post</button>
           </form>
        </div>
    </div>
  )
}

export default CreatePost