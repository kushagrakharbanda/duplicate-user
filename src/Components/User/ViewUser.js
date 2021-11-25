import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getUsers } from '../../Service/api'

function ViewUser() {
    const [user, setUser] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        loadUserData();
    }, [])
    const loadUserData = async () => {
        const response = await getUsers(id)
        setUser(response.data)
        console.log(response.data)
    }
    return (
        <div className="container">
        <div className="container mt-3 justify-content-center">
            <div class="card">
                <div class="card-header">
                    CURRENT USER DATA AVAILABE:
                </div>
                <div class="card-body">
                    <h5 class="card-title">NAME: {user.name}</h5>
                    <h6 class="card-title">EMAIL: {user.email}</h6>
                    <h6 class="card-title">MOBILE: {user.mobile}</h6>
                </div>
            </div>
</div>

            {(user.accountNo === undefined && user.bankName === undefined && user.holdername === undefined && user.ifscCode === undefined) ? <Link to={`/addBank/${id}`} class="btn btn-danger">ADD BANKING DETAILS</Link>
                : <div class="container mt-3 justify-content-center">
                    <div class="card">
                        <div class="card-header">
                            BANKING DETAILS:
                        </div>
                        <div class="card-body">
                            <h6 class="card-title">ACCOUNT NUMBER: {user.accountNo}</h6>
                            <h6 class="card-title">BANK NAME: {user.bankName}</h6>
                            <h6 class="card-title">ACCOUNT HOLDER NAME: {user.holderName}</h6>
                            <h6 class="card-title">IFSC CODE: {user.ifscCode}</h6>
                            <Link to={`/editBank/${id}`} class="btn btn-primary mt-3">EDIT DETAILS</Link>
                        </div>
                    </div>
                </div>
            }
            {(user.address === undefined && user.city === undefined && user.dob === undefined && user.religion === undefined) ? <Link to={`/addPersonal/${id}`} class="btn btn-warning mx-3">ADD PERSONAL DETAILS</Link>
                :
                <div class="container mt-3 justify-content-center">
                    <div class="card">
                        <div class="card-header">
                            PERSONAL DETAILS:
                        </div>
                        <div class="card-body">
                            <h6 class="card-title">HOME ADDRESS: {user.address}</h6>
                            <h6 class="card-title">CITY: {user.city}</h6>
                            <h6 class="card-title">DATE OF BIRTH: {user.dob}</h6>
                            <h6 class="card-title">RELIGION: {user.religion}</h6>
                            <Link to={`/editPersonal/${id}`} class="btn btn-primary mt-3">EDIT DETAILS</Link>
                        </div>
                    </div>
                </div>
            }
           
        </div>
    )
}

export default ViewUser
