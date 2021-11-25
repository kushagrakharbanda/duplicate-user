import React, { useState ,useEffect} from 'react'
import { useCookies } from 'react-cookie';
import { validateForm } from '../../Validation'
import { addClient ,getUsersByDepartment,getUserbyname } from '../../Service/api'
import {useHistory,Link} from 'react-router-dom'
import AddClients from '../Templates/Client/AddClients';

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

const AddClient = () => {
    const history = useHistory();
    const [errors, setErrors] = useState({ name: "",address: "",
                                           city:"",country: "",
                                           postalCode: "",
                                           salesRepresentative: "",
                                           projectLead: "",projectManager: ""
                                         });
    const [client, setClient] = useState(initialValues);
    const [projectInp,setProjectInp] = useState([]);
    const [managerInp,setManagerInp] = useState('');
    const [salesInp,setSalesInp] = useState('');
    const [cookieid, setCookieid] = useCookies(["userId"]);
    const id=cookieid.userId;
    
    const onchange = (e) => {
        setClient({ ...client, [e.target.name]: e.target.value ,createdBy:id}) ; 
        console.log(client);
    }

    //first
   const projectChange=(val)=>{
       setProjectInp(val);
    }
    const loadProject=async(input)=>{
        let department="Project-Lead"  ;
        let resp= await getUserbyname(input,department);
        return resp.data;    
    }

    const onChange=(value)=>{  
        projectChange(value);
        value.map(val=>{
            setClient({...client,clientProjectLead:[...client.clientProjectLead,val.name]});
        })
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
         value.map(val=>{
            setClient({...client,clientProjectManager:[...client.clientProjectManager,val.name]});
        })
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
         value.map(val=>{
            setClient({...client,clientSalesRepresentative:[...client.clientSalesRepresentative,val.name]});
        })
     }

    const validate = (client) => {
        let error = {name: "",address: "",city:"",country: "",postalCode: "",
                    salesRepresentative: "",projectLead: "",projectManager: "" };
        error.name = validateForm('name', client.clientName);
        error.address = validateForm('address', client.clientAddress);
        error.city = validateForm('city', client.clientCity);
        error.country = validateForm('country', client.clientCountry);
        error.postalCode = validateForm('postalCode', client.clientPostalCode);
        error.salesRepresentative = validateForm('salesRepresentative', client.clientSalesRepresentative);
        error.projectLead = validateForm('projectLead', client.clientProjectLead);
        error.projectManager = validateForm('projectManager', client.clientProjectManager);
        setErrors(error);
        if (error.name=== undefined && error.address === undefined && error.city ===undefined && 
            error.country ===undefined && error.postalCode ===undefined && error.salesRepresentative ===undefined
            && error.projectLead ===undefined && error.projectManager ===undefined)
              {
                if(client.name!=="" && client.address !=="" && client.city !=="" && client.country !=="" && client.postalCode !=="" && client.salesRepresentative !=="" && client.projectLead !=="" && client.projectManager !=="")
                    {return true}
              }
        else if (error.name && error.address  && error.city
                  && error.country  && error.postalCode  && 
                  error.salesRepresentative  && error.projectLead  && error.projectManager )
                  {
                    {return false}
                  }
        else return false;
    }

    const handleClick=async(e)=>{
        e.preventDefault();
        if(validate(client)){
            await addClient(client);
            history.push('/allClient');
        }
    }
    return (
      <>
        <AddClients 
            errors={errors} 
            onchange={onchange}  
            loadProject={loadProject}  
            loadManager={loadManager} 
            onChangeM={onChangeM} 
            managerChange={managerChange}    
            handleClick={handleClick}    
            loadSales={loadSales} 
            onChangeS={onChangeS} 
            onChange={onChange} 
            projectChange={projectChange} 
            salesChange={salesChange} 
        />
      </>
    )
}

export default AddClient
