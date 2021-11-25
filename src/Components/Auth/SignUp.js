import React, { useState } from 'react'
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {addAuthUser, getAuthUsers} from '../../Service/api'
import { validateForm } from '../../Validation';
const initialValues={
    name:"",
    email:"",
    password:"",
}
function SignUp() {
    const [errors, setErrors] = useState({ name: "", email: "", mobile: "" })
    const [authUser,setAuthUser] = useState();
    const history = useHistory();
    const [curUser,setCurUser] = useState(initialValues);
    const {name,email,password} = curUser;

    const onValueChange = (e) => {
        setCurUser({...curUser, [e.target.name]:e.target.value});
    }

    const validate = (user) => {
        let error = { name: "", email: "", mobile: "" };
        error.name = validateForm('name', user.name);
        error.email = validateForm('email', user.email);
        error.mobile = validateForm('mobile', user.mobile);
        setErrors(error);
        if (error.name=== undefined && error.email === undefined && error.mobile ===undefined) {
            if(user.name!=="" && user.email!=="" && user.mobile!=="")
                {return true}
        }
        else if (error.name && error.email && error.mobile ){
                {return false}
        }
        else return false
    }

    const register = async (e) => {
        e.preventDefault();
        console.log(curUser);
        if(validate(curUser))
        {
            await addAuthUser(curUser);
            history.push('/login');
        }
    }

    const login=(e)=>{
        e.preventDefault();
        history.push('/login');
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
            <h2 className="text-center mb-3">SIGN UP FOR LOGGING IN</h2>
            <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" 
                    name="name" 
                    value={name} 
                    className=" form-control" 
                    onChange={(e)=>onValueChange(e)} 
                />
                {(errors.name) ? 
                    <div class="alert alert-danger w-25 h-25" role="alert">{errors.name}</div> : <div></div>}
            </div>
            <div className="mb-3">
                <label className="form-label">Email address</label>
                <input type="email" 
                    name="email" 
                    value={email} 
                    className="form-control" 
                    onChange={(e)=>onValueChange(e)} 
                />
                {(errors.email) ? 
                    <div class="alert alert-danger w-25 h-25" role="alert">{errors.email}</div> : <div></div>}
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password"
                    name="password" 
                    value={password} 
                    className="form-control" 
                    onChange={(e)=>onValueChange(e)} 
                />
                {(errors.mobile) ? 
                    <div class="alert alert-danger w-25 h-25" role="alert">{errors.mobile}</div> : <div></div>}
            </div>
                <button className="btn btn-danger" onClick={(e)=>register(e)} >
                    Register
                </button>
                <button className="btn btn-danger mx-2" onClick={(e)=>login(e)} >
                   Login
                </button>
        </form>
    </div>
    )
}

export default SignUp
