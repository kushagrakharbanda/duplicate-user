import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { editUser, getUsers} from '../../Service/api'
const initialValues={
    bankName:"",
    accountNo:"",
    holderName:"",
    ifscCode:""
}
function AddBank() {
    const history = useHistory();
    const [errors, setErrors] = useState({ bankName:"", accountNo:"", holderName:"", ifscCode:"" });
    const [user,setUser] = useState({initialValues});
    const {id} = useParams();
    const {bankName,accountNo,holderName,ifscCode} = user;

    const onValueChange = (e) => {
        setUser({...user, [e.target.name]:e.target.value});
    }

    const validate = async (user) => {
        let error = {   bankName:"", accountNo:"", holderName:"", ifscCode:""};
        if( user.bankName!==""&& user.accountNo!=="" && user.holderName!==""&& user.ifscCode!==""){
            await editUser(id,user);
            history.push(`/view/${id}`);
        }
        else if ( user.bankName==="" || user.accountNo==="" || user.holderName===""|| user.ifscCode==="") {
            error.bankName="Bank name is required";
            error.accountNo="Account number is required";
            error.holderName="Account holder name is required";
            error.ifscCode="Bank IFSC code is required";
            setErrors(error);
        }
    }

     const handleClick=(e)=>{
         e.preventDefault();
         console.log(user);
         validate(user);
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
            <h2 className="text-center mb-3">Enter user's banking details</h2>
            <div className="mb-3">
                <label className="form-label">Name of Bank :</label>
                <input type="text" 
                    name="bankName" 
                    value={bankName} 
                    className=" form-control" 
                    onChange={(e)=>onValueChange(e)} 
                />
                {(errors.bankName) ?
                     <div class="alert alert-danger w-25 h-25" role="alert">{errors.bankName}</div> : <div></div>}
            </div>
            <div className="mb-3">
                <label className="form-label">Account number :</label>
                <input type="text" 
                    name="accountNo" 
                    value={accountNo} 
                    className="form-control"  
                    onChange={(e)=>onValueChange(e)}
                />
                {(errors.accountNo) ? 
                    <div class="alert alert-danger w-25 h-25" role="alert">{errors.accountNo}</div> : <div></div>}
            </div>
            <div className="mb-3">
                <label className="form-label">Account holder name :</label>
                <input type="text" 
                    name="holderName" 
                    value={holderName} 
                    className="form-control"  
                    onChange={(e)=>onValueChange(e)} 
                />
                {(errors.holderName) ? 
                    <div class="alert alert-danger w-25 h-25" role="alert">{errors.holderName}</div> : <div></div>}
            </div>
            <div className="mb-3">
                <label className="form-label">IFSC code :</label>
                <input type="text" 
                    name="ifscCode" 
                    value={ifscCode} 
                    className="form-control" 
                    onChange={(e)=>onValueChange(e)} 
                />
                {(errors.ifscCode) ? 
                    <div class="alert alert-danger w-25 h-25" role="alert">{errors.ifscCode}</div> : <div></div>}
            </div>
                <button className="btn btn-danger" onClick={handleClick} >
                    Add
                </button>
        </form>
    </div>
    )
}

export default AddBank
