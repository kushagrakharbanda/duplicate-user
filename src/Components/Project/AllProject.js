import React, { useEffect , useState } from 'react'
import { useCookies } from 'react-cookie';
import { Link ,useParams } from 'react-router-dom';
import { getProject,deleteProject} from '../../Service/api';
import Pagination from "../Pagination.js"
const AllProject = () => {
  const [cookieid, setCookieid] = useCookies(["userId"]);
  const userId=cookieid.userId;
    const [projects,setProjects]=useState([]);
    const [currentPage,setCurrentPage]=useState(1)
    const [projectPerPage,setProjectPerPage]=useState(5)

    const getAllProject = async() =>{
       const response=await getProject(userId);
       setProjects(response.data);
    }
    const deleteProjectData= async(id)=>{
      
        await deleteProject(id);
        getAllProject();
    }
    
  const indexOfLastProject=currentPage * projectPerPage;
  const indexOfFirstProject=indexOfLastProject - projectPerPage;
  const currentProject=projects.slice(indexOfFirstProject,indexOfLastProject);
  
  const thisPage=(pageNumber)=>{
    setCurrentPage(pageNumber)
  }
  
  useEffect(()=>{
    getAllProject();
},[])
    return (
        <div className="container">
           <div className="d-flex justify-content-end">
            <Link to="/addProject" className="btn btn-outline-secondary mt-2 btn-lg">ADD PROJECT</Link>
          </div>
           <table className="table table-hover mt-2">
  <thead className=" table-dark table-striped">
    <tr >
      <th scope="col">ID</th>
      <th scope="col">Project Name</th>
      <th scope="col">Client Name</th>
      <th scope="col">Project Start Date</th>
      <th scope="col">Project Due Date</th>
      <th scope="col">Project Lead</th>
      <th scope="col">Project Manager</th>
      <th scope="col">Project Notes</th>
      <th scope="col">EDIT</th>
      <th scope="col">DELETE</th>
     
    </tr>
  </thead>

  <tbody>
    {/* {renderList()} */}
      {currentProject.map(project=>(
        
     <tr key={project.id}>
      <th scope="row">{project.id}</th>
      <th scope="row">{project.projectName}</th>
      <td>{project.clientName}</td>
      <td>{project. projectStartDate}</td>
      <td>{project.projectDueDate}</td>
      <td>{project.projectLead.toString()}</td>
      <td>{project.projectManager.toString()}</td>
      <td>{project.notes}</td>
      <td><Link className="btn btn-outline-warning" to={`/editProject/${project.id}`}>EDIT</Link></td>
      <td><button className="btn btn-outline-secondary" onClick={()=>{deleteProjectData(project.id)}}>DELETE</button></td>
      </tr>

      ))}
    
  </tbody>
  
</table> 
  <Pagination 
    userPerPage={projectPerPage} 
    totalUsers={projects.length} 
    setPage={thisPage} 
    currentPage={currentPage}
    />

        </div>
    )
}

export default AllProject
