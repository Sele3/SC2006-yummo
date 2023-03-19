import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link} from "react-router-dom"

function Signup()
{
    //This part is getting executed continuously onChange i.e. for every change in the boxes typed, lines before the submit will get executed
    const [email, setEmail] = useState({})
    const [password, setPassword] = useState({})
    const [username, setUsername] = useState({})
    const state = {
                    "email":'',
                    "username":'',
                    "password": ''
    };
    //console.log(state);
    
    const url = 'http://127.0.0.1:8000/auth/users/';
    const data = {"address": state};
    const [result, setResult] = useState({});
    
    async function submit(e)
    {
        e.preventDefault();
        let user = {
            "email":email,
                    "username":username,
                    "password": password
                };
        
        //useEffect(() => {
            console.log(1);
            axios.post(url, user);
            console.log("Success");
        //     .then(res => {
        //         if (res.data) {
        //             setResult(res.data);
        //         }
        //     })
        //     .catch(err => {
        //         console.error(err);
        //     });
        // }, [])

    }
    return(
        <div className="Signup">
            <h1>SignUp</h1>
            <form action="POST">
                <input type="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email" />
                <input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" />
                <input type="text" onChange={(e)=>{setUsername(e.target.value)}} placeholder="Username" />
                
                <input type="submit" onClick={submit}/>
            </form>

        </div>
    )
}
export default Signup