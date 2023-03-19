import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link} from "react-router-dom"
import './sidebar.css';


function MerchantPageAccount()
{
    const rootPath = "../../../../../Backend/";
    var imgPath ;
    const geturl = 'http://127.0.0.1:8000/auth/users/';
    const posturl = 'http://127.0.0.1:8000/auth/users/';
    //var information = axios.get(geturl)
    var information = {
        'restaurantName' : 'Shi Li Fang Hotpot' ,
        'noofbranch' : 15 ,
        'email' : "shilifang@gmail.com" ,
        'telephonenumber' : "68708888"
    }
    const [restName, setRestaurantName] = useState({})
    const [branchNumber, setBranchNumber] = useState({})
    const [email, setEmail] = useState({})
    const [telephonenumber, setTelephoneNumber] = useState({})
    async function discard()
    {
        window.location.reload();   
    }
    async function save(e)
    {
        e.preventDefault();
        let user = {
            'restaurantName' : 'Shi Li Fang Hotpot' ,
            'noofbranch' : 15 ,
            'email' : "shilifang@gmail.com" ,
            'telephonenumber' : "68708888"
    }
            axios.post(posturl, user);
    }
    return(
        <div className="merchantpageaccount">
            <div className="sidebar">
            <button className="sidebar-item" onClick={<Link to="/"></Link>}>Overview</button>
            <button className="sidebar-item">Account</button>
            <button className="sidebar-item">Merchant Reviews</button>
            <button className="sidebar-item">MSecurity</button>
            <button className="sidebar-item">Boost Restaurant</button>
            
            </div>
            <div className="centre">
            <h1>Account</h1>
            <h2>Restaurant Information</h2>
                       <h3> Avatar </h3>
            <p></p>
            <img src={rootPath} alt="Logo" />
            <h3> Restaurant Name </h3>
            <input type="text" defaultValue={information['restaurantName']} onChange={(e)=>{setRestaurantName(e.target.value)}} placeholder="Restaurant Name" /> 

            <h3> Number of Branch </h3>
            <input type="text" defaultValue={information['noofbranch']} onChange={(e)=>{setBranchNumber(e.target.value)}} placeholder="No. of Branch" /> 

            <h3> Email </h3>
            <input type="email" defaultValue={information['email']} onChange={(e)=>{setEmail(e.target.value)}} placeholder="Contact Email" /> 

            <h3> Telephone Number </h3>
            <input type="text" defaultValue={information['telephonenumber']} onChange={(e)=>{setTelephoneNumber(e.target.value)}} placeholder="Telephone Number" /> 

            <input type="submit" onClick={save}/>
            <input type="submit" value= "Discard"onClick={discard}/>
            </div>
        </div>
    )
}
export default MerchantPageAccount