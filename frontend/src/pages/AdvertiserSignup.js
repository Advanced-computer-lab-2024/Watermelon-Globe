import './SignUp.css';
import {useState } from "react"
// import Seller from "../../../ModelsGuest/seller"
const SignupAdvertiser =()=>{
    const [Username,setUsername]=useState("")
    const [Email,setEmail]=useState("")
    const [Password,setPassword]=useState("")
    const [error,setError]=useState("")

    const handleSubmit =async(e)=>{
        e.preventDefault()
        const advertiser ={Username,Email,Password}
        const response = await fetch('/addAdvertiser',{
            method:'POST',
            body:JSON.stringify(advertiser),
            headers :{
                'Content-type':'application/json'
            }
        })
        const json =await response.json()
        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
             alert("Singing in as advertiser was successful")
            setUsername('');
            setEmail('');
            setPassword('')
            setError(null)
            console.log("new advertiser added",json)
        }
    }
return (
    <form className ="create" onSubmit={handleSubmit}>
        <h3> Sign up</h3>

        <label> Username :
        <input 
        type="text"
        onChange={(e)=> setUsername(e.target.value)}
        value={Username}/>
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
<button> Sign up as advertiser</button>
    </form>
)}

export default SignupAdvertiser