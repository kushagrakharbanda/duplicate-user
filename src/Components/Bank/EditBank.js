import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import {editUser, getUsers} from '../../Service/api'
const initialValues={
    bankName:"",
    accountNo:"",
    holderName:"",
    ifscCode:""
}
function EditBank() {
    const history = useHistory();
    const [user,setUser] = useState(initialValues);
    const {bankName,accountNo,holderName,ifscCode} = user;
    const {id} = useParams();

    const onValueChange = (e) => {
        setUser({...user, [e.target.name]:e.target.value});
    }

    const editUserDetails = async (e) => {
        e.preventDefault();
        await editUser(id,user);
        history.push(`/view/${id}`);
    }

    useEffect(()=>{
        loadUserData();
    },[])
    const loadUserData = async () => {
       const response= await getUsers(id);
       setUser(response.data);
    }
    return (
        <div className="container mt-3 justify-content-center">
       <form >
            <h2 className="text-center mb-3">Edit user's banking details</h2>
            <div className="mb-3">
                <label className="form-label">Name of Bank :</label>
                <input type="text" 
                    name="bankName" 
                    value={bankName} 
                    className=" form-control" 
                    onChange={(e)=>onValueChange(e)} 
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Account number :</label>
                <input type="text" 
                    name="accountNo" 
                    value={accountNo} 
                    className="form-control"  
                    onChange={(e)=>onValueChange(e)}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Account holder name :</label>
                <input type="text" 
                    name="holderName" 
                    value={holderName} 
                    className="form-control"  
                    onChange={(e)=>onValueChange(e)} 
                />
            </div>
            <div className="mb-3">
                <label className="form-label">IFSC code :</label>
                <input type="text" 
                    name="ifscCode" 
                    value={ifscCode} 
                    className="form-control" 
                    onChange={(e)=>onValueChange(e)} 
                />
            </div>
                <button className="btn btn-danger" onClick={editUserDetails} >
                    Update
                </button>
        </form>
    </div>
    )
}

export default EditBank
