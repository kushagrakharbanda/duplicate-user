import userReducer from 'C:/Users/LC-1150/Desktop/new/new-users/src/redux/reducers/userReducer.js'
import projectReducer from 'C:/Users/LC-1150/Desktop/new/new-users/src/redux/reducers/projectReducer.js'
import {combineReducers} from "redux"

 const rootReducer=combineReducers({
    userReducer,
    projectReducer,
})
export default rootReducer