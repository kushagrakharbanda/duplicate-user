import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';
import {Link,useParams} from 'react-router-dom'
import { useHistory  } from 'react-router-dom';
import EditProjects from '../Templates/Projects/EditProjects';

import { editProject, getUserbyname,addProject,getProjectBy,getClientByS } from '../../Service/api'

const initialValues = {
    projectName: "",
    clientName: "",
    projectStartDate: "",
    projectDueDate: "",
    projectLead: "",
    projectManager: "",
    notes: "",
    createdBy:""
}
const EditProject = () => {
    const [cookieid, setCookieid] = useCookies(["userId"]);
    const userId = cookieid.userId;
    const {id} = useParams();
    const [project, setProject] = useState(initialValues);
    const [clients,setClients] = useState([]);
    const { projectName,clientName,projectStartDate,projectDueDate,projectLead,projectManager,notes} = project;
    const history = useHistory();
    const [projectInp,setProjectInp] = useState([]);
    const [managerInp,setManagerInp] = useState('');
    const [clientInp,setClientInp] = useState('');
   
    const onchange = (e) => {
        e.preventDefault();
        setProject({ ...project, [e.target.name]: e.target.value });
    }
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
     setProject({...project,projectLead:value.name});

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
      setProject({...project,projectManager:value.name});
  }
   //third
   const clientChange=(val)=>{
    setClientInp(val);
 }
 const loadClient=async(input)=>{
     let resp= await getClientByS(input);
     return resp.data;    
    }
 const onChangeC=(value)=>{  
     clientChange(value);
     setProject({...project,clientName:value.name});
 }
    const handleClick = async (e) => {
        e.preventDefault();
        await editProject(id,project);
        history.push('/allProject');
    }

    const loadData = async () => {
        const response2= await getProjectBy(id);
        setProject(response2.data);
    }
    useEffect(()=>{
        loadData();
    },[])
   
    return (
      <>
       <EditProjects 
            projectName={projectName} 
            loadClient={loadClient} 
            onChangeC={onChangeC} 
            clientChange={clientChange} 
            clients={clients} 
            clientName={clientName} 
            projectStartDate={projectStartDate} 
            projectDueDate={projectDueDate} 
            project={project} 
            projectLead={projectLead} 
            projectManager={projectManager} 
            notes={notes} 
            handleClick={handleClick} 
            onchange={onchange} 
            onchange={onchange} 
            loadProject={loadProject} 
            loadManager={loadManager} 
            onChangeM={onChangeM} 
            managerChange={managerChange}  
            onChange={onChange} 
            projectChange={projectChange}
       />
      </>
    )
}

export default EditProject
