import React, { useEffect, useState } from 'react'
import { useHistory, useParams  } from 'react-router-dom';
import {editUser, getUsers,getAvailableDepartment} from '../../Service/api'
import EditUsers from '../Templates/Users/EditUsers';

import { validateForm } from '../../Validation';
const initialValues={
    name:"",
    email:"",
    mobile:"",
    department:""
}
function EditUser() {
    const [errors, setErrors] = useState({ name: "", email: "", mobile: "" })
    const history=useHistory();
    const [user,setUser]=useState(initialValues);
    const {name,email,mobile,department}=user;
    const [departments,setDepartments] = useState([])
    const {id}=useParams();
    const onValueChange=(e)=>{
        setUser({...user, [e.target.name]:e.target.value})
    }
    const loadDepartments=async()=>{
        const response= await getAvailableDepartment();
        setDepartments(response.data)
        console.log(departments)
    }
    const validate = (user) => {
        let error = { name: "", email: "", mobile: "" ,department:""}
        error.name = validateForm('name', user.name)
        error.email = validateForm('email', user.email)
        error.mobile = validateForm('mobile', user.mobile)
        error.department=validateForm('department',user.department)

        setErrors(error)
        console.log(error)
        if (error.name=== undefined && error.email === undefined && error.mobile ===undefined) {
            if(user.name!=="" && user.email!=="" && user.mobile!=="")
            {return true}
        }
        else if (error.name && error.email && error.mobile ){
            {return false}
        }
        else return false
    }
    const editUserDetails=async (e)=>{
        e.preventDefault();
        if(validate(user)){
        await editUser(id,user)
        history.push('/all')
        }
    }
    useEffect(()=>{
        loadUserData();
        loadDepartments()
    },[])
    const loadUserData=async()=>{
       const response= await getUsers(id)
       setUser(response.data)
    }
    return (
        <>
        <EditUsers onValueChange={onValueChange} name={name} errors={errors} email={email} mobile={mobile} department={department} departments={departments} editUserDetails={editUserDetails}/>
        </>
      
    )
}

export default EditUser
