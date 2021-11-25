import React , {useState} from 'react'
import { addDepartment } from '../../Service/api'
import { validateForm } from '../../Validation'
import {useHistory,Link} from 'react-router-dom'


function AddDepartment ()  {
    const [department,setDepartment] = useState({name:""});
    const [errors, setErrors] = useState({ name: "" });
    const history = useHistory()
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
        else return false
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(validate(department)){
            await addDepartment(department); 
            history.push('/allDepartment')
        }
    }
    return (
        <div className="container mt-3 justify-content-center">
            <div className="card card-dark">
              <div className="card-header">
              <h2 className="text-center mb-3">Add Department</h2>
              </div>
            <div className="card-body">
        <form className="row mb-3">
            
            <div className="col-md-6">
                <label className="form-label">Department Name</label>
                <input type="text" 
                    name="department" 
                    placeholder="Enter new department name here"  
                    className=" form-control" 
                    onChange={(e) =>{setDepartment({name:e.target.value})}} 
                    autoComplete="off" 
                />
                {(errors.name) ? <span className="text-danger">{errors.name}</span> : <span></span>}
            </div>
        </form>
        </div>
        <div class="card-footer">
            <button className="btn btn-danger mx-1" id="alertFields" onClick={(e) => handleSubmit(e)} >
                Add
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
