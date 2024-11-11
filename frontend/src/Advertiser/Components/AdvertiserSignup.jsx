// src/SignupPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupPage = ({ onSignup }) => {
    const [Name,setUsername]=useState("")
    const [Email,setEmail]=useState("")
    const [Password,setPassword]=useState("")
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const advertiser ={Name,Email,Password}
        const response = await fetch('/api/Advertiser/createProfile',{
            method:'POST',
            body:JSON.stringify(advertiser),
            headers :{
                'Content-type':'application/json'
            }
        });
        const json =await response.json()
        if(response.ok){
            setUsername('');
            setEmail('');
            setPassword('')
            setError(null)
            console.log("new Advertiser added",json)
            navigate(`/advertiserSignupConfirm/${json.profile._id}`); 
        }
    };

    return (
        <form className ="create" onSubmit={handleSubmit}>
        <h3> Sign up</h3>

        <label> Username :
        <input 
        type="text"
        onChange={(e)=> setUsername(e.target.value)}
        value={Name}/>
        </label>

        <label> Email :
            <input 
            type="email"
            onChange={(e)=> setEmail(e.target.value)}
            value={Email}/>
        </label>

        <label> Password :
            <input 
            type="password"
            onChange={(e)=> setPassword(e.target.value)}
            value={Password}/>
        </label>
        <button> Sign up as Advertiser</button>
    </form>
    );
};

export default SignupPage;