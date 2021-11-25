import React , {useState,useEffect} from 'react'
import { editDepartment,getAvailableDepartment } from '../../Service/api'
import { validateForm } from '../../Validation'
import { useHistory, useParams  } from 'react-router-dom';
import {Link} from 'react-router-dom'


function AddDepartment ()  {
    const [department,setDepartment] = useState({name:""});
    const [errors, setErrors] = useState({ name: "" });
    const {id} = useParams();
    const validate = (department) => {
        let error = { name: "" };
        error.name = validateForm('department', department.name);
        setErrors(error);
        if (error.name=== undefined ) {
            if(department.name!=="" )
                {return true}
        }
        else if (error.name ){
                {return false}
        }
        else return false;
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(validate(department)){
            await editDepartment(id,department);  
        }
    }
    
    const loadDepartmentData=async(id)=>{
        const response= await getAvailableDepartment(id);
        setDepartment(response.data);
     }
     useEffect(()=>{
        loadDepartmentData(id);
    },[])
    
    return (
        <div className="container mt-3 justify-content-center">
              <div className="card card-dark">
              <div className="card-header">
              <h2 className="text-center mb-3">Update Department</h2>
              </div>
            <div className="card-body">
        <form >
            <div className="mb-3">
                <label className="form-label">Department Name</label>
                <input type="text" 
                    name="department" 
                    value={department.name}  
                    className="w-25 form-control" 
                    onChange={(e) =>{setDepartment({name:e.target.value})}} 
                    autoComplete="off" 
                />
                {(errors.name) ? <span className="text-danger">{errors.name}</span> : <span></span>}
            </div>
            </form>
        </div>
        <div class="card-footer">
            <button className="btn btn-danger" id="alertFields" onClick={(e) => handleSubmit(e)} >
                Update
            </button>
            <Link className="btn btn-warning mx-1" to="/allDepartment" >
               Cancel
            </Link>
        </div>
        </div>
    </div>
    )
}

export default AddDepartment
