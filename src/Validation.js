export const validateForm = (type, data) => {
  let error={}
  var letters = /^[A-Za-z]+$/;
  var name=/^[a-zA-Z\s]*$/;
  switch (type) {
    case 'name':
      if (!data) {
        return error.name = "Please enter name all fields are required"
      }
      if (!data.match(name)) {
        return error.name = 'Please input alphabet characters only';
      }
      else if (data.length > 20 || data.length < 4) {
        return error.name = "Name should be at least 4 character and not more than 20 characters"
      }
      break;
    case 'email':
      if (!data) {
        return error.email = "Please enter email"

      }
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data)) {
      }
      else {
        return error.email = "You have entered an invalid email address!"
      }
      break;
    case 'mobile':
      if (!data) {
        return error.mobile = "Please enter a mobile number"
      }
      if (data.length < 10) {
        return error.mobile = "Mobile number must be of 10 digits"
      }
      if (data.length > 10) {
        return error.mobile = "Mobile number must be of 10 digits"
      }
      break;
    case 'address':
      if(!data){
        return error.address="Please enter a Address"
      }
      break;
    case 'city':
      if(!data){
        return error.city="Please select a city"
      }
      break;
      case 'country':
        if(!data){
          return error.country="Please select a country"
        }
        break;
    case 'postalCode':
    if(!data){
      return error.postalCode="Please enter postal code"
    }
    if (data.match(letters)) {
      return error.name = 'Please input numerical characters only';
    }
    break;
    case 'date':
      if(!data){
        return error.postalCode="Please select a date"
      }
      break;
    case 'salesRepresentative':
      if(!data){
        return error.salesRepresentative="Please select a sales representative"
      }
      break;
      case 'projectLead':
        if(!data){
          return error.projectLead="Please select a project lead"
        }
        break;
        case 'projectManager':
          if(!data){
            return error.projectManager="Please select a project manager"
          }
          break;
        case 'department':
            if(!data){
              return error.department="Please enter a department"
            }
            if(data.indexOf(' ') > -1){
              return error.department="Please use - instead of using space"
            }
            break;
    default:
      return error.mobile = "Please enter a mobile number",
        error.name = "Please enter name all fields are required",
        error.email = "Please enter email"
  }
}




























// export  const handleValidation=(user)=> {
//         let name = user.name;
//         let email = user.email;
//         let mobile=user.mobile;
//         let errors={}
//         let formIsValid = true;
//         //Name
//         if (!name) {
//           formIsValid = false;
//           errors["name"] = "Cannot be empty";
//         }
//         if (typeof(name)!== "undefined") {
//           if (name.match(/^[a-zA-Z]+$/)) {
//             formIsValid = false;
//             errors["name"] = "Only letters";
//           }
//         }
//         //Email
//         if (email) {
//           formIsValid = false;
//           errors["email"] = "Cannot be empty";
//         }

//         if (typeof(email) !== "undefined") {
//           let lastAtPos = email.lastIndexOf("@");
//           let lastDotPos = email.lastIndexOf(".");

//           if (
//             !(
//               lastAtPos < lastDotPos &&
//               lastAtPos > 0 &&
//               email.indexOf("@@") == -1 &&
//               lastDotPos > 2 &&
//               email.length - lastDotPos > 2
//             )
//           ) {
//             formIsValid = false;
//             errors["email"] = "Email is not valid";
//           }
//         }
//         //mobile
//         if(mobile){
//           formIsValid = false;
//           errors["mobile"] = "Cannot be empty";
//         }
//         if(mobile.length!==10){
//           formIsValid = false;
//           errors["mobile"] = "Mobile mut be 10 digits long";
//         }

//           return formIsValid
//       }
