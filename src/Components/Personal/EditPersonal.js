import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import {editUser, getUsers} from '../../Service/api'
const initialValues={
    address:"",
    city:"",
    dob:"",
    religion:""
}

function EditPersonal() {
    const history = useHistory();
    const [user,setUser] = useState(initialValues);
    const {address,city,dob,religion} = user;
    const {id}=useParams();

    const onValueChange=(e)=>{
        setUser({...user, [e.target.name]:e.target.value});
    }

    const editUserDetails=async (e)=>{
        e.preventDefault();
        await editUser(id,user);
        history.push(`/view/${id}`);
    }

    useEffect(()=>{
        loadUserData();
    },[])

    const loadUserData=async()=>{
       const response= await getUsers(id);
       setUser(response.data);
    }

    return (
        <div className="container mt-3 justify-content-center">
        <form >
            <h2 className="text-center mb-3">Enter user's personal details:</h2>
            <div className="mb-3">
                <label className="form-label">ADDRESS :</label>
                <input type="text" 
                    name="address" 
                    value={address} 
                    className=" form-control" 
                    onChange={(e)=>onValueChange(e)}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">CITY :</label>
                <input type="text" 
                    name="city" 
                    value={city} 
                    className="form-control" 
                    onChange={(e)=>onValueChange(e)} 
                />
            </div>
            <div className="mb-3">
                <label className="form-label">DATE OF BIRTH :</label>
                <input type="text" 
                    name="dob" 
                    value={dob} 
                    className="form-control" 
                    onChange={(e)=>onValueChange(e)} 
                />
            </div>
            <div className="mb-3">
                <label className="form-label">RELIGION :</label>
                <input type="text" 
                    name="religion" 
                    value={religion} 
                    className="form-control" 
                    onChange={(e)=>onValueChange(e)}
                />
            </div>
                <button className="btn btn-danger" onClick={editUserDetails} >
                    Add
                </button>
        </form>
    </div>
    )
}

export default EditPersonal
