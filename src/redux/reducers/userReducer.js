import { addUser} from '../../Service/api'
const intialState=[{
    name: "",
    email: "",
    mobile: "",
    department:"",
    createdBy:""
}]
const settingUser= async (user)=>{
    await addUser(user)
}
const userReducer=(state=intialState,action)=>{
    switch(action.type){
         case "ADDUSER":
             state=[...state,action.payload]
             settingUser(state)
             return state
        default :
            return state;
    }
}

export default userReducer