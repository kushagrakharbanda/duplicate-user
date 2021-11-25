import React, { useEffect , useState } from 'react'
import { useCookies } from 'react-cookie';
import { Link ,useParams } from 'react-router-dom';
import { getClient,deleteClient} from '../../Service/api';
import Pagination from "../Pagination.js"
const AllClient = () => {
  const [cookieid, setCookieid] = useCookies(["userId"]);
  const userId = cookieid.userId;
    const [clients,setClients] = useState([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [clientPerPage,setClientPerPage] = useState(5);

    const getAllClient = async() =>{
       const response=await getClient(userId);
       setClients(response.data);
    }

    const deleteClientData= async(id)=>{
        await deleteClient(id);
        getAllClient();
    }
    
  const indexOfLastClient=currentPage * clientPerPage;
  const indexOfFirstClient=indexOfLastClient - clientPerPage;
  const currentClient=clients.slice(indexOfFirstClient,indexOfLastClient);
  
  const thisPage=(pageNumber)=>{
    setCurrentPage(pageNumber);
  }
  
  useEffect(()=>{
    getAllClient();
},[])
    return (
        <div className="container">
           <div class="d-flex justify-content-end">
            <Link  to="/addClient" className="btn btn-outline-secondary mt-2 btn-lg">ADD CLIENT</Link>
          </div>
           <table className=" table-hover table mt-2">
  <thead className=" table-dark table-striped">
    <tr >
      <th scope="col">ID</th>
      <th scope="col">CLIENT NAME</th>
      <th scope="col">ADDRESS</th>
      <th scope="col">CITY</th>
      <th scope="col">COUNTRY</th>
      <th scope="col">POSTAL CODE</th>
      <th scope="col">SALES REPRESENTATIVE</th>
      <th scope="col">PROJECT LEAD</th>
      <th scope="col">PROJECT MANAGER</th>
      <th scope="col">EDIT</th>
      <th scope="col">DELETE</th>
     
    </tr>
  </thead>
  <tbody>
      {currentClient.map(client=>(
        
     <tr key={client.id}>
      <th scope="row">{client.id}</th>
      <th scope="row">{client.clientName}</th>
      <td>{client.clientAddress}</td>
      <td>{client.clientCity}</td>
      <td>{client.clientCountry}</td>
      <td>{client.clientPostalCode}</td>
      <td>{client.clientSalesRepresentative.toString()}</td>
      <td>{client.clientProjectLead.toString()}</td>
      <td>{client.clientProjectManager.toString()}</td>
      <td><Link className="btn btn-outline-warning" to={`/editClient/${client.id}`}>EDIT</Link></td>
      <td><button className="btn btn-outline-danger" onClick={()=>{deleteClientData(client.id)}}>DELETE</button></td>
    </tr>
      ))}
  </tbody>
</table> 
  <Pagination 
    userPerPage={clientPerPage} 
    totalUsers={clients.length} 
    setPage={thisPage} 
    currentPage={currentPage}
    />

        </div>
    )
}

export default AllClient
