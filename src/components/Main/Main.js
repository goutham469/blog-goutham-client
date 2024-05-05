import './Main.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

function Main() {
    const [posts, setPosts] = useState([]);
    const [count, setCount] = useState(0);
    const [userName, setUserName] = useState('user');

    useEffect(() => {
        // Fetch initial data
        fetchData();
        // Fetch count
        fetchCount();
        // Retrieve username from cookies
        const userNameFromCookie = Cookies.get('blogAppUserName');
        if (userNameFromCookie) {
            setUserName(userNameFromCookie);
        }
    }, []);

    const fetchData = () => {
        fetch("https://blog-project-backend-l4o8.onrender.com/posts/getPosts")
            .then(response => response.json())
            .then(data => {
                setPosts(data.payload);
            })
            .catch(error => console.error("Error fetching posts:", error));
    };

    const fetchCount = () => {
        fetch("https://blog-project-backend-l4o8.onrender.com/count/modifyCount", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: "to modify count" })
        })
        .then(response => response.json())
        .then(data => setCount(data.payload))
        .catch(error => console.error("Error fetching count:", error));
    };

    const updateViews = (post) => {
        const postId = post._id;
        fetch(`https://blog-project-backend-l4o8.onrender.com/posts/updateViews/?_id=${postId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ view: 1 })
        })
        .then(response => {
            if (response.ok) {
                // Refresh data after views are updated
                fetchData();
            } else {
                console.error("Failed to update views");
            }
        })
        .catch(error => console.error("Error updating views:", error));
    };

    return (
        <div>
            <div className='row'>
                <div className='col-lg-1'>
                    <button onClick={fetchData} className='btn btn-danger'>Refresh</button>
                </div>
                <div className='col-lg-8'><h3 className='text-warning '>Welcome {userName}</h3></div>
                <div className='col-lg-1'>
                    <Link to='/CreatePost'><button className='btn btn-success'>New Post</button></Link>
                </div>
                <div className='col-lg-2'>Total views = {count}</div>
            </div>
            <div className='m-5'>
                <div className='row'>
                    {posts.map(post => (
                        <div key={post._id} onClick={() => updateViews(post)} className='postsDiv col-lg-3'>
                            <div className='row'>
                                <div className='authorDiv col-lg-8'>Author: {post.author}</div>
                                <div className='viewsDiv col-lg-4'>{post.views} Views</div>
                            </div>
                            <div className='col-lg-12'>{post.body}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Main;
