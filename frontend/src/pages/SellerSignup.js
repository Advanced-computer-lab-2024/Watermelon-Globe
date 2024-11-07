import './SignUp.css';
import {useState } from "react"
// import Seller from "../../../ModelsGuest/seller"
const SignupSeller =()=>{
    const [Name,setUsername]=useState("")
    const [Email,setEmail]=useState("")
    const [Password,setPassword]=useState("")
    const [error,setError]=useState("")

    const handleSubmit =async(e)=>{
        e.preventDefault()
        const seller ={Name,Email,Password}
        const response = await fetch('/api/seller/CreateSeller',{
            method:'POST',
            body:JSON.stringify(seller),
            headers :{
                'Content-type':'application/json'
            }
        })
         const json =await response.json()
        // if(!response.ok){
        //     setError(json.error)
        // }
        if(response.ok){
             alert("Singing in as seller was successful")
            setUsername('');
            setEmail('');
            setPassword('')
            setError(null)
            console.log("new Seller added",json)
        }
    }
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
<button> Sign up as seller</button>
    </form>
)}

export default SignupSeller








//////////To get data !!!!! For later USE!!!
// const[tourists,setTourists]=useState(null)
// useEffect(()=>{
//     const getTourists = async() => {
//         const response = await fetch('/getTourists')
//         const json = await response.json()
//         if (response.ok){
//             setTourists(json)
//         }
//     }
//     getTourists()
// },[])
// return (
//     <div className="tourists">
// {tourists && tourists.map((tourist) => (
// <div key={tourist.id}>
//   {Object.entries(tourist).map(([key, value]) => (
//     <p key={key}>
//       {key}: {value}
//     </p>
//   ))}
// </div>
// ))}
// </div>

//   );
// };