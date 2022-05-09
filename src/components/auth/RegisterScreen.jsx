import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from '../../actions/ui';
import { startLoginWithForm } from '../../actions/auth';

export const RegisterScreen = () => {

 const dispatch =useDispatch();

 const {msgError}=useSelector(state => state.ui);

const [formValues,handleInputChange] = useForm()


const {name,email,password,password2} = formValues;

const handleRegister=(e) => {
  e.preventDefault();
 
  if(isFormValid()){
    dispatch(startLoginWithForm(email,password,name))
  }


}

const isFormValid = () =>{
    
  if(name.trim().length ===0){
    dispatch(setError('Name is required'))
    return false;
  }
  else if(!validator.isEmail(email)){
    dispatch(setError('Email not Valid'))
      return false;
  }
  else if(password !== password2 ){
    dispatch(setError('The password not matched'))
       return false;
  }

  else if(password.length <5){
    dispatch(setError('The password is required most the 5 characters'))
    return false;
}
   dispatch(removeError());
  return true;

}

  return (
  <>
  <h3 className="auth__litle">Register</h3>

  <form className="animate__animated animate__fadeIn animate__faster" onSubmit={handleRegister}>

  {
    msgError && 
    <div className="auth__alert-error">
    {msgError}
  </div>

  }

  <input type="text"
   placeholder="Name"
  name="name" 
  className="auth__input"
     autoComplete='off'
    onChange={handleInputChange}/>

    <input type="text"
     placeholder="Email"
      name="email"
       className="auth__input"
         autoComplete='off'
          value={email}
           onChange={handleInputChange}
           />

    <input type="password"
     placeholder="Password"
      name="password"
     className="auth__input"
       onChange={handleInputChange}/>

    <input type="password"
     placeholder="Confirm Password"
      name="password2"
        className="auth__input"
          onChange={handleInputChange}/>

    <button type="submit"
     className="btn btn-primary">
      Login
    </button>

       <hr />

       <div className="auth__social-media">
        
     
  </div>
         <Link  to="/auth/login" className="link">
             <h4>Already registered ?</h4>
         </Link>

      </form>
</>)
};
