import {Link} from 'react-router-dom';

export default function AddUsers  (props) {
    const {name ,errors,email,departmentOptions,departments,addUserDetails,mobile,onchange}=props
    return(
            <div className="container mt-3 justify-content-center">
            <div className="card card-dark">
              <div className="card-header">
              <h3 className="text-center">Add new user below</h3>
              </div>
            <div className="card-body">
            <form id="quickForm" className="row g-3 " >

                <div className="col-md-6">
                    <label className="form-label">Name</label>
                    <input type="text" 
                        placeholder="Enter user name here" 
                        name="name" value={name}
                        className=" form-control" 
                        onChange={(e) => onchange(e)}
                        autoComplete="off" 
                    />
                    {(errors.name) ? <span className="text-danger">{errors.name}</span> : <span></span>}
                </div>
                <div className="col-md-6">
                    <label className="form-label">Email address</label>
                    <input type="email" 
                        placeholder="Enter user email here" 
                        name="email"
                        value={email} 
                        className="form-control" 
                        onChange={(e) => onchange(e)} 
                        required autoComplete="off"
                    />
                    {(errors.email) ? <span className="text-danger">{errors.email}</span> : <span></span>}
                </div>
                <div className="col-md-6">
                    <label className="form-label">Mobile</label>
                    <input type="phone" placeholder="Enter user mobile here" name="mobile" value={mobile} className="form-control" onChange={(e) => onchange(e)} required autoComplete="off" />
                    {(errors.mobile) ? <span className="text-danger">{errors.mobile}</span> : <span></span>}
                </div>
                <div className="col-md-6">
                    <label className="form-label mx-2">Select Department</label>
                    <select className="form-select " name="selectList" id="selectList" name="department" onChange={(e)=>onchange(e)}>
                    <option>Click to see options</option>
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
                <div className="container  justify-content-center">
                <button className="btn btn-danger mx-2" id="alertFields" onClick={(e) => addUserDetails(e)} >
                    Add
                </button>
                <Link className="btn btn-warning mx-1" to="/all" >
                   Cancel
                </Link>
         </div>
                </div>
           
        </div>
</div>
    )
}