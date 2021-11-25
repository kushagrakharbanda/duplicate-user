
import {Link} from 'react-router-dom'

export default function EditUsers (props){
    const {onValueChange ,errors,departments,department,email,mobile,name,editUserDetails}=props;
    return(
    <div className="container mt-3 justify-content-center">
         <div className="card card-dark">
              <div className="card-header">
              <h2 className="text-center mb-3">Edit user below</h2>
              </div>
            <div className="card-body">
    <form className="row g-3 " >
        <div className="col-md-6">
            <label className="form-label">Name</label>
            <input type="text" className=" form-control" onChange={(e)=>onValueChange(e)}  name="name" value={name}/>
            {(errors.name) ? <span className="text-danger">{errors.name}</span> : <span></span>}
        </div>
        <div className="col-md-6">
            <label className="form-label">Email address</label>
            <input type="email" name="email" value={email} className="form-control" onChange={(e)=>onValueChange(e)} />
            {(errors.email) ? <span className="text-danger">{errors.email}</span> : <span></span>}

        </div>
        <div className="col-md-6">
            <label className="form-label">Mobile</label>
            <input type="phone" name="mobile" value={mobile} className="form-control" onChange={(e)=>onValueChange(e)} />
            {(errors.mobile) ? <span className="text-danger">{errors.mobile}</span> : <span></span>}

        </div>
        <div className="col-md-6">
                <label className="form-label mx-2">Select Department</label>
                <select className="form-select" name="selectList" id="selectList" name="department" onChange={(e)=>onchange(e)}>
                   <option value={department}>{department}</option>
                {departments.map(department=>{
                    return(
                   <option value={department.name}>{department.name}</option>
                )})}
                </select>  
                {(errors.department) ? <span className="text-danger">{errors.department}</span> : <span></span>}

            </div>
            </form>
    </div>
    <div class="card-footer">
            <button className="btn btn-danger" onClick={(e)=>editUserDetails(e)} >
                Update
            </button>
            <Link className="btn btn-warning mx-1" to="/all" >
               Cancel
            </Link>
            </div>
    
    </div>
</div>
    )
}