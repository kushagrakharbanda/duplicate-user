import React, { useState,useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import {getAuthUsers} from '../../Service/api'
import { useCookies } from "react-cookie";
const initialValues={
    email:"",
    password:""
}
function Login() {
    const [cookies, setCookie] = useCookies(["user"]);
    const [cookieid, setCookieid] = useCookies(["loggedInUser"]);
    const history=useHistory();
    const [authUser,setAuthUser] = useState();
    const [curUser,setCurUser] = useState(initialValues);
    const {email,password} = curUser;

    const onValueChange=(e)=>{
        setCurUser({...curUser, [e.target.name]:e.target.value});
    }

    function CreateCookie(name) {
        setCookie("user",name,{path:"/",maxAge:3600});
    }

    function CreateCookieid(id) {
        setCookieid("userId",id,{path:"/",maxAge:3600});
    }

    const Loging=  (e)=>{
        e.preventDefault();
        if( curUser.email!=="" && curUser.password!==""){
            authUser.map( async (user)=>{
                if(user.email===curUser.email && user.password===curUser.password ){
                    CreateCookie(user.name);
                    CreateCookieid(user.id);
                    history.push(`/all`);
                    window.location.reload();
                }
            }
            )
        } 
      if (curUser.email==="" || curUser.password==="")  {
            alert("Details cannot be left blank");
        }
    }

    const signin=(e)=>{
        e.preventDefault();
        history.push('/register');
    }

    const loadAuthData=async()=>{
        const response= await getAuthUsers();
        setAuthUser(response.data);

    }

    useEffect(()=>{
        loadAuthData();
    },[])


    return (
        <div className="container mt-3 justify-content-center">
        <form >
            <h2 className="text-center mb-3">LOG IN TO CONTINUE</h2>
           <p className="text-center"> If you dont already have a account click on SignUp.</p>
            <div className="mb-3">
                <label className="form-label">Email address</label>
                <input type="email" 
                    name="email" 
                    value={email} 
                    className="form-control" 
                    onChange={(e)=>onValueChange(e)} 
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" 
                    name="password" 
                    value={password} 
                    className="form-control" 
                    onChange={(e)=>onValueChange(e)} 
                />
            </div>
            <button className="btn btn-danger" onClick={(e)=>Loging(e)} >
                    Log In
            </button>
            <button className="btn btn-warning mx-2" onClick={(e)=>signin(e)} >
                    Sign Up
            </button>
        </form>
    </div>
    )
}

export default Login
