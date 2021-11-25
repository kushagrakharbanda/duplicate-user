import React, { useEffect , useState } from 'react'
import { useCookies } from 'react-cookie';
import { Link ,useParams } from 'react-router-dom';
import { getUsers , deleteUser, getUsersBy} from '../../Service/api';
import Pagination from "../Pagination.js"
const AllUsers = () => {
  const [cookieid, setCookieid] = useCookies(["userId"]);
  const userId=cookieid.userId;
    const [users,setUsers]=useState([]);
    const [currentPage,setCurrentPage]=useState(1)
    const [userPerPage,setUserPerPage]=useState(5)

    const getAllUsers = async() =>{
       const response=await getUsersBy(userId);
       setUsers(response.data);
    }
    const deleteUserData= async(id)=>{
      
        await deleteUser(id);
        getAllUsers();
    }
    
  const indexOfLastUser=currentPage * userPerPage;
  const indexOfFirstUser=indexOfLastUser - userPerPage;
  const currentUser=users.slice(indexOfFirstUser,indexOfLastUser);
  
  const thisPage=(pageNumber)=>{
    setCurrentPage(pageNumber)
  }

 
  useEffect(()=>{
    getAllUsers();
},[])
    return (
        <div className="container">
          <div className="d-flex justify-content-end">
            <Link to="/add" className="btn btn-outline-secondary mt-2 btn-lg">ADD USER</Link>
          </div>
           <table className="table mt-2 table-hover">
  <thead className=" table-dark table-striped">
    <tr >
      <th scope="col">ID</th>
      <th scope="col">NAME</th>
      <th scope="col">EMAIL</th>
      <th scope="col">MOBILE</th>
      <th scope="col">DEPARTMENT</th>
      <th scope="col">VIEW</th>
      <th scope="col">EDIT</th>
      <th scope="col">DELETE</th>
     
    </tr>
  </thead>
  <tbody>
      {currentUser.map(user=>(
        
        <tr key={user.id}>
      <th scope="row">{user.id}</th>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.mobile}</td>
      <td>{user.department}</td>
      <td><Link className="btn btn-outline-dark" to={`/view/${user.id}`}>VIEW</Link></td>
      <td><Link className="btn btn-outline-warning" to={`/edit/${user.id}`}>EDIT</Link></td>
      <td><button className="btn btn-outline-danger" onClick={()=>{deleteUserData(user.id)}}>DELETE</button></td>
    </tr>
      ))}
  </tbody>
</table> 
  <Pagination 
    userPerPage={userPerPage} 
    totalUsers={users.length} 
    setPage={thisPage} 
    currentPage={currentPage}
    />

        </div>
    )
}

export default AllUsers
