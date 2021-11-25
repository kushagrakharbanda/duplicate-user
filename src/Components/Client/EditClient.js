import React, { useEffect, useState } from 'react'
import { useHistory, useParams  } from 'react-router-dom';
import {Link} from 'react-router-dom'
import {editClient, getClientById,getUsersByDepartment,getUserbyname} from '../../Service/api'
import { validateForm } from '../../Validation';
import EditClients from '../Templates/Client/EditClients';

const initialValues = {
    clientName: "",
    clientAddress: "",
    clientCity:"",
    clientCountry: "",
    clientPostalCode: "",
    clientSalesRepresentative: "",
    clientProjectLead: "",
    clientProjectManager: "",
    createdBy:""
}

function EditClient() {
    const history = useHistory();
    const [client,setClient] = useState(initialValues);
    const {clientName,clientAddress,clientCity,clientCountry,
            clientPostalCode,clientSalesRepresentative,
            clientProjectLead,clientProjectManager,} = client;
    const {id} = useParams();
    const [projectInp,setProjectInp] = useState([]);
    const [managerInp,setManagerInp] = useState('');
    const [salesInp,setSalesInp] = useState('');

    //first
    const projectChange=(val)=>{
        setProjectInp(val);
    }

     const loadProject=async(input)=>{
         let department="Project-Lead"; 
         let resp= await getUserbyname(input,department);
         return resp.data;    
    }

     const onChange=(value)=>{  
         projectChange(value);
         setClient({...client,clientProjectLead:value.name});
     }

     //sec
     const managerChange=(val)=>{
         setManagerInp(val);
      }

      const loadManager=async(input)=>{
            let department="Project-Manager";  
            let resp= await getUserbyname(input,department);
            return resp.data;
      }

      const onChangeM=(value)=>{  
            managerChange(value);
            setClient({...client,clientProjectManager:value.name});
      }

      //third
      const salesChange=(val)=>{
         setSalesInp(val);
      }

      const loadSales=async(input)=>{
          let department="Sales-Representative";  
          let resp= await getUserbyname(input,department);
          return resp.data;   
        }

      const onChangeS=(value)=>{  
          salesChange(value);
       setClient({...client,clientSalesRepresentative:value.name});
      }

      //end
    const onchange=(e)=>{
        setClient({...client, [e.target.name]:e.target.value});
    }
 
    const editClientDetails=async (e)=>{
        e.preventDefault();
        await editClient(id,client);
        history.push('/allClient');
    }

    useEffect(()=>{
        loadClientData();
    },[])

    const loadClientData=async()=>{
       const response= await getClientById(id);
       setClient(response.data);
    }

    return (
       <>
       <EditClients 
       clientName={clientName} 
       clientProjectLead={clientProjectLead} 
       clientProjectManager={clientProjectManager} 
       clientSalesRepresentative={clientSalesRepresentative} 
       clientAddress={clientAddress} 
       clientCity={clientCity} 
       clientCountry={clientCountry} 
       clientPostalCode={clientPostalCode}  
       editClientDetails={editClientDetails} 
       onchange={onchange}  
       loadProject={loadProject}  
       loadManager={loadManager} 
       onChangeM={onChangeM} 
       managerChange={managerChange}      
       loadSales={loadSales} 
       onChangeS={onChangeS} 
       onChange={onChange} 
       projectChange={projectChange} 
       salesChange={salesChange}
       />
       </>
    )
}

export default EditClient
