import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link} from "react-router-dom"

function Login()
{
    //This part is getting executed continuously onChange i.e. for every change in the boxes typed, lines before the submit will get executed
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    //const [username, setUsername] = useState('')
    const state = {
                    "email":'',
                    "password": ''
    };
    //console.log(state);
    
    const url = 'http://127.0.0.1:8000/auth/token/login/';
    const data = {"address": state};
    const [result, setResult] = useState({});
    const token = "qwertyuiop";
    async function submit(e)
    {
        e.preventDefault();
        let user = {
            "email": email,
            "password": password
        }
            console.log(1);
            axios.post(url, user)
                .then(res => {
                    if (res.data) {
                        setResult(res.data);
                       
                    }
                })
                .catch(err => {
                    console.error(err);
                });
            console.log("Success");
           

    }
    return(
        <div className="login">
            <h1>Login</h1>
            <form action="POST">
                <input type="text" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email" />
                <input type="text" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" />


                <input type="submit" onClick={submit}/>
            </form>

        </div>
    )
}
export default Login