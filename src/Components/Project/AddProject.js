import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';
import { useHistory  } from 'react-router-dom';
import { validateForm } from '../../Validation'
import AddProjects from '../Templates/Projects/AddProjects';
import { getClientByS, getUsersByDepartment,addProject, getUserbyname } from '../../Service/api'
import {useSelector,useDispatch} from "react-redux"
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
const AddProject = () => {
    const projectRedux=useSelector((state)=>state)
    const dispatch=useDispatch()
    const [cookieid, setCookieid] = useCookies(["userId"]);
    const userId = cookieid.userId;
    const history = useHistory();
    const [errors, setErrors] = useState({projectName:"",clientName:"",projectStartDate:"",
                                         projectDueDate:"",projectLead:"",projectManager:""});
    const [clients,setClients] = useState([]);
    const [project, setProject] = useState(initialValues);
    const [clientProjectLead, setClientProjectLead] = useState([]);
    const [clientProjectManager, setClientProjectManager] = useState([]);
    const [projectInp,setProjectInp] = useState('');
    const [managerInp,setManagerInp] = useState('');
    const [clientInp,setClientInp] = useState('');
   
    const onchange = (e) => {
        e.preventDefault();
        setProject({ ...project, [e.target.name]: e.target.value , createdBy:userId });
    }
    const data={
        ...project
    };
    //first
    const projectChange=(val)=>{
        setProjectInp(val)
    }

    const loadProject=async(input)=>{
        let department = "Project-Lead"; 
        let resp= await getUserbyname(input,department);
        return resp.data;    
    }

    const onChange=(value)=>{  
        projectChange(value);
        value.map(val=>{
            setProject({...project,projectLead:[...project.projectLead,val.name]});
        });
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
            setProject({...project,projectManager:[...project.projectManager,val.name]});
        });
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
        setProject({...project,clientName:value.clientName});
    }

    const validate = (client) => {
        let error = {projectName:"",clientName:"",projectStartDate:"",projectDueDate:"",projectLead:"",projectManager:"" };
        error.projectName = validateForm('name', project.projectName);
        error.clientName = validateForm('name', project.clientName);
        error.projectStartDate = validateForm('date', project.projectStartDate);
        error.projectDueDate = validateForm('date', project.projectDueDate);
        error.projectLead = validateForm('projectLead', project.projectLead);
        error.projectManager = validateForm('projectManager', project.projectManager);
        setErrors(error);
        if (error.projectName=== undefined && error.clientName === undefined && error.projectStartDate ===undefined && error.projectDueDate ===undefined && error.projectLead ===undefined && error.projectManager  ===undefined) {
            if(project.projectName!=="" && project.clientName !=="" && project.projectStartDate !=="" && project.projectDueDate !=="" && project.projectLead !=="" && project.projectManager  !=="" )
                {return true}
        }
        else if (error.projectName && error.clientName  && error.projectStartDate  && error.projectDueDate  && error.projectLead  && error.projectManager   ){
                {return false};
        }
        else return false;
    }

    const handleClick = async (e) => {
        e.preventDefault();
        if(validate(project)){
            dispatch({type:"ADDPROJECT",payload:data})
            await addProject(project);
            history.push('/allProject');
        }
    }
  
    return (
        <>
            <AddProjects 
                errors={errors} 
                loadClient={loadClient} 
                onChangeC={onChangeC} 
                clientChange={clientChange} 
                clients={clients} 
                project={project} 
                clientProjectLead={clientProjectLead} 
                clientProjectManager={clientProjectManager} 
                handleClick={handleClick} 
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

export default AddProject;
