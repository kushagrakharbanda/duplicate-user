import {Link} from 'react-router-dom'
import AsyncSelect from 'react-select/async'

export default function EditProjects (props) {
   const {projectName,clientInp,onChangeC,loadClient,clientChange ,clientName,clients ,projectStartDate ,projectDueDate, project ,projectLead ,projectManager, notes, handleClick, onchange,loadProject,projectInp,onChange,projectChange,onChangeM,loadManager,managerChange,managerInp}=props
    return (
        <div className="container mt-3 justify-content-center">
            <div className="card card-dark">
              <div className="card-header">
              <h2 className="text-center mb-3">Edit Project below</h2>
              </div>
            <div className="card-body">
            <form className="row g-3">
                
                
                <div className="col-md-3">
                    <label className="form-label">Project Name</label>
                    <input type="text" name="projectName" value={projectName} className=" form-control" onChange={(e) => onchange(e)} autoComplete="off" />
                </div>
                <div className="col-md-3">
                    <label className="form-label">Client Name</label>
                    <AsyncSelect value={clientInp} placeholder={clientName} getOptionLabel={e=>e.clientName} getOptionValue={e => e.clientName} onInputChange={clientChange} onChange={(e)=>onChangeC(e)}  loadOptions={loadClient}/>

                   </div>
                <div className="col-md-3">
                    <label className="form-label mx-2">Project Start Date</label><br/>
                    <input type="date" className="form-select"  name="projectStartDate" value={projectStartDate} onChange={(e) => onchange(e)}/>
                      </div>
                <div className="col-md-3">
                    <label className="form-label mx-2">Project Due Date</label><br/>
                    <input type="date" className="form-select" name="projectDueDate" value={projectDueDate} min={project.projectStartDate} onChange={(e) => onchange(e)}/>
                </div>
                    <div className="col-md-6">
                        <label className="form-label mx-2">Project Lead</label><br/>
                        <AsyncSelect value={projectInp} placeholder={projectLead.toString()} getOptionLabel={e=>e.name} getOptionValue={e => e.name} onInputChange={projectChange} onChange={(e)=>onChange(e)}  loadOptions={loadProject}/>

                    </div>
                    <div className="col-md-6">
                        <label className="form-label  mx-2">Project Manager</label><br/>
                        <AsyncSelect value={managerInp} placeholder={projectManager.toString()}  getOptionLabel={e=>e.name} getOptionValue={e => e.name} onInputChange={managerChange} onChange={(e)=>onChangeM(e)}  loadOptions={loadManager}/>

                    </div>
                    <div className="d-flex justify-content-center">
                <label className="form-label mx-2">Notes</label><br/>
                <div className="mb-3">
                <textarea name="notes" value={notes} rows="4" cols="100" onChange={(e) => onchange(e)} />
                </div>
                </div>
                </form>
            </div>
            <div class="card-footer">
                <div className="d-flex justify-content-center">
                <button className="btn btn-danger mx-1 " id="alertFields" onClick={(e)=>{handleClick(e)}} >
                    Add
                </button>
                <Link className="btn btn-warning mx-1 " to="/allProject" >
                   Cancel
                </Link>
                </div>
               </div> 
            </div>
        </div>
    )
}