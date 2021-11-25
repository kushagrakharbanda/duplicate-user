import React, { useEffect , useState } from 'react'
import { Link  } from 'react-router-dom';
import { getAvailableDepartment,deleteDepartment} from '../../Service/api';
const AllDepartment = () => {
    const [departments,setDepartments]=useState([]);
    
    const getAllDepartments = async() =>{
       const response=await getAvailableDepartment();
       setDepartments(response.data);
    }

    const deletedepartment= async(id)=>{
        await deleteDepartment(id);
        getAllDepartments();
    }
     
  useEffect(()=>{
    getAllDepartments();
},[])
    return (
        <div className="container">
           <div class="d-flex justify-content-end">
            <Link to="/addDepartment" className="btn btn-outline-secondary mt-2 btn-lg">ADD DEPARTMENT</Link>
          </div>
           <table className="table mt-2 table-hover">
  <thead className=" table-dark table-striped">
    <tr >
      <th scope="col">ID</th>
      <th scope="col">DEPARTMENT NAME</th>
      <th scope="col">EDIT</th>
      <th scope="col">DELETE</th>
     
    </tr>
  </thead>
  <tbody>
      {departments.map(department=>(
        
        <tr key={department.id}>
      <th scope="row">{department.id}</th>
      <td>{department.name}</td>
      <td><Link className="btn btn-outline-warning" to={`/editDepartment/${department.id}`}>EDIT</Link></td>
      <td><button className="btn btn-outline-danger" onClick={()=>{deletedepartment(department.id)}}>DELETE</button></td>
    </tr>
      ))}
  </tbody>
</table> 
 
        </div>
    )
}

export default AllDepartment
