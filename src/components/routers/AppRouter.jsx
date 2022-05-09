import React,{useEffect, useState} from 'react';
import {BrowserRouter as Router,Switch,Redirect} from"react-router-dom";
import { JournalScreen } from '../journal/JournalScreen';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/auth';
import {PublicRoute } from '../routers/PublicRoute'
import {PrivateRoute } from '../routers/PrivateRoute'
import { AuthRouter } from './AuthRouter';
import { startLoadingNotes } from '../../actions/notes';
 
export const AppRouter = () => {

const [cheking, setCheking] = useState(true);
const [isLoggedIn, setIsLoggedIn] = useState(false);

 const  dispatch=useDispatch();
 useEffect(() => {
  
  const auth = getAuth();
  onAuthStateChanged ( auth,async (user) =>{
     if(user?.uid){
    dispatch(login(user.uid,user.displayName));
    setIsLoggedIn(true);

     dispatch(startLoadingNotes(user.uid));
    
   
     }else{
       setIsLoggedIn(false);
     }

     setCheking(false);
  })
 }, [dispatch,cheking,isLoggedIn]);
 

 if(cheking){
   return (
     <h1>Espere...</h1>
   )
 }

  return <Router>
         
  <div>
  
  <Switch>


   
<PublicRoute 
 path="/auth" 
 isAuthenticated={isLoggedIn} 
component={AuthRouter}
/>






<PrivateRoute 
exact
isAuthenticated={isLoggedIn} 
path="/"  
component={JournalScreen}
/> 

<Redirect to="/auth/login"/>


</Switch>

  </div>

   </Router>;
};
