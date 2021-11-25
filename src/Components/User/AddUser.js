import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';
import { useHistory, useParams  } from 'react-router-dom';
import AddUsers from '../Templates/Users/AddUsers';
import { addUser, getAuthUsers,getAvailableDepartment } from '../../Service/api'
import { validateForm } from '../../Validation'
import {useSelector,useDispatch} from "react-redux"
const initialValues = {
    name: "",
    email: "",
    mobile: "",
    department:"",
    createdBy:""
}
function AddUser() {
    const userRedux=useSelector((state)=>state)
    
    const dispatch=useDispatch()
    const [errors, setErrors] = useState({ name: "", email: "", mobile: "" })
    const [cookieid, setCookieid] = useCookies(["userId"]);
    const id=cookieid.userId;
    const history = useHistory();
    const [user, setUser] = useState(initialValues);
    const { name, email, mobile ,department } = user;
    const [departments,setDepartments] = useState([])
    const onchange = (e) => {
        e.preventDefault();
        setUser({ ...user, [e.target.name]: e.target.value , createdBy:id})

    }
    const validate = (user) => {
        let error = { name: "", email: "", mobile: "",department:""}
        error.name = validateForm('name', user.name)
        error.email = validateForm('email', user.email)
        error.mobile = validateForm('mobile', user.mobile)
        error.department=validateForm('department',user.department)
        setErrors(error)
        if (error.name=== undefined && error.email === undefined && error.mobile ===undefined) {
            if(user.name!=="" && user.email!=="" && user.mobile!=="")
            {return true}
        }
        else if (error.name && error.email && error.mobile ){
            {return false}
        }
        else return false
    }
    const settingUser= async (user)=>{
        await addUser(user)
        history.push("/all")
    }
    const data={
        ...user
    };

    const addUserDetails = (e) => {
        e.preventDefault();
         if (validate(user)) {
           
             dispatch({type:"ADDUSER",payload:data})
             settingUser(user)

         }
    }
    const loadDepartments=async()=>{
        const response= await getAvailableDepartment();
        setDepartments(response.data)
    }
    useEffect(()=>{
      loadDepartments()
      console.log(departments)

    },[])
    return (
        <>
        <AddUsers name={name} errors={errors} email={email} mobile={mobile} departments={departments} addUserDetails={addUserDetails} onchange={onchange}/>
        </>
    )
}

export default AddUser
