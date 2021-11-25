const initialState = [{
    projectName: "",
    clientName: "",
    projectStartDate: "",
    projectDueDate: "",
    projectLead: "",
    projectManager: "",
    notes: "",
    createdBy:""
}]
const projectReducer=(state=initialState,action)=>{
    switch(action.type){
         case "ADDPROJECT":
             state=[...state,action.payload]
             return state
        default :
            return state;
    }
}

export default projectReducer