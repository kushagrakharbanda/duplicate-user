import axios from 'axios';

const url = process.env.URL;

const authUrl=process.env.AUTH_URL;

const departmentURL=process.env.DEPARTMENT_URL;

const clientURL=process.env.CLIENT_URL;

const projectURL=process.env.PROJECT_URL;

export const addProject=async(project)=>{
    return await axios.post(projectURL,project)
}
export const getProject=async(userId)=>{
    return await axios.get(`${projectURL}?createdBy=${userId}`)
}
export const deleteProject=async (id)=>{
    return await axios.delete(`${projectURL}/${id}`)
}
export const getProjectBy=async(id)=>{
    return await axios.get(`${projectURL}/${id}`)
}
export const editProject=async (id,project)=>{
    return await axios.put(`${projectURL}/${id}`,project)
}


export const addDepartment=async(department)=>{
    return await axios.post(departmentURL,department)
}
 export const getAvailableDepartment=async(id)=>{
   id=id || ""
     return await axios.get(`${departmentURL}/${id}`)
 }
 export const deleteDepartment=async (id)=>{
    return await axios.delete(`${departmentURL}/${id}`)
}
export const editDepartment=async (id,department)=>{
    return await axios.put(`${departmentURL}/${id}`,department)
}
 export const addClient=async(client)=>{
    return await axios.post(clientURL,client)
}
export const getClient=async(userId)=>{
    return await axios.get(`${clientURL}?createdBy=${userId}`)
}
export const deleteClient=async (id)=>{
    return await axios.delete(`${clientURL}/${id}`)
}
export const editClient=async (id,user)=>{
    return await axios.put(`${clientURL}/${id}`,user)
}
export const getClientById=async (id)=>{
    id=id || '';
    return await axios.get(`${clientURL}/${id}`);

}
export const getClientByS=async(user)=>{
    return await axios.get(`${clientURL}?clientName_like=${user}`)
}


export const addAuthUser=async (user)=>{
    return await axios.post(authUrl,user)
}
export const getAuthUsers=async (id)=>{
    id=id || '';
    return await axios.get(`${authUrl}/${id}`);

}
export const logInAuthUser=async (id,user)=>{
    return await axios.put(`${authUrl}/${id}`,user)
}
export const getUsersBy=async (userId)=>{
    return await axios.get(`${url}?createdBy=${userId}`);
}
export const getUsersByDepartment=async (department)=>{
    return await axios.get(`${url}?department=${department}`);

}
export const getUserbyname=async(user,department,)=>{
    return await axios.get(`${url}?name_like=${user}&department=${department}`);
}
export const getUsers=async (id)=>{
    id=id || '';
    return await axios.get(`${url}/${id}`);

}

export const addUser=async (user)=>{
    return await axios.post(url,user)
}

export const editUser=async (id,user)=>{
    return await axios.put(`${url}/${id}`,user)
}


export const deleteUser=async (id)=>{
    return await axios.delete(`${url}/${id}`)
}