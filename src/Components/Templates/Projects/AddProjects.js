import {Link} from 'react-router-dom'
import AsyncSelect from 'react-select/async'


export default function AddProjects (props){
    const {errors,clients,clientInp,onChangeC,loadClient,clientChange,clientProjectManager,project,clientProjectLead,handleClick,onchange,loadProject,projectInp,onChange,projectChange,onChangeM,loadManager,managerChange,managerInp}=props
    return (

        <div className="container mt-3 justify-content-center">
             <div className="card card-dark">
              <div className="card-header">
              <h2 className="text-center mb-3">Add Project below</h2>
              </div>
            <div className="card-body">
            <form className="row g-3" >
                
                
                <div className="col-md-3">
                    <label className="form-label">Project Name</label>
                    <input type="text" placeholder="Enter project's name here" name="projectName" className=" form-control" onChange={(e) => onchange(e)} autoComplete="off" />
                    {(errors.projectName) ? <span className="text-danger">{errors.projectName}</span> : <span></span>}
               
                </div>
                <div className="col-md-3">
                    <label className="form-label">Client Name</label>
                    <AsyncSelect value={clientInp}  getOptionLabel={e=>e.clientName} getOptionValue={e => e.clientName} onInputChange={clientChange} onChange={(e)=>onChangeC(e)}  loadOptions={loadClient}/>

     {(errors.clientName) ? <span className="text-danger">{errors.clientName}</span> : <span></span>}
               
                </div>
                <div className="col-md-3">
                    <label className="form-label mx-2">Project Start Date</label><br/>
                    <input type="date" className="form-select" name="projectStartDate" onChange={(e) => onchange(e)}/>
                    {(errors.projectStartDate ) ? <span className="text-danger">{errors.projectStartDate }</span> : <span></span>}
                      </div>
                <div className="col-md-3">
                    <label className="form-label mx-2">Project Due Date</label><br/>
                    <input type="date" className="form-select" name="projectDueDate" min={project.projectStartDate} onChange={(e) => onchange(e)}/>
                    {(errors.projectDueDate) ? <span className="text-danger">{errors.projectDueDate}</span> : <span></span>}
              
                </div>
                    <div className="col-md-6">
                        <label className="form-label mx-2">Project Lead</label><br/>
                        <AsyncSelect 
                            value={projectInp} 
                            isMulti clearValue 
                            getOptionLabel={e=>e.name} 
                            getOptionValue={e => e.name}
                            onInputChange={projectChange}
                            onChange={(e)=>onChange(e)} 
                            loadOptions={loadProject}
                        />

                    {(errors.projectLead) ? <span className="text-danger">{errors.projectLead}</span> : <span></span>}

                    </div>
                    <div className="col-md-6">
                        <label className="form-label  mx-2">Project Manager</label><br/>
                        <AsyncSelect value={managerInp}  isMulti clearValue getOptionLabel={e=>e.name} getOptionValue={e => e.name} onInputChange={managerChange} onChange={(e)=>onChangeM(e)}  loadOptions={loadManager}/>

                    {(errors.projectManager) ? <span className="text-danger">{errors.projectManager}</span> : <span></span>}

                    </div>
                    <div className="d-flex justify-content-center">
                <label className="form-label mx-2">Notes</label><br/>
                   <textarea name="notes" placeholder="Take notes here" rows="4" cols="100" onChange={(e) => onchange(e)} />
                </div>
                </form>
            </div>
            <div class="card-footer">
                <div className="d-flex justify-content-center">
                <button className="btn btn-danger  " id="alertFields" onClick={(e)=>{handleClick(e)}} >
                    Add
                </button>
                <Link className="btn btn-warning mx-4" to="/allProject" >
                   Cancel
                </Link>
                </div>
               </div> 
          </div>  
        </div>
    )
}