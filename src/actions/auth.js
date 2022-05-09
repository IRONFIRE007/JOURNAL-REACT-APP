import { getAuth, signInWithPopup,createUserWithEmailAndPassword, updateProfile,signInWithEmailAndPassword} from 'firebase/auth';
import {googleAuthProvider} from '../firebase/firebaseConfig'
import {types} from '../types/types'
import {signOut} from 'firebase/auth'
import {auth} from '../firebase/firebaseConfig'
import { FinishLoading, StartLoading } from './ui';
import Swal from 'sweetalert2'
import { noteLogout } from './notes';


export const login = (uid,displayName) =>{
    return{
        type:types.login,
        payload:{
            uid,
            displayName
        }
    }

}



export const startGoogleLogin = () =>{
    return (dispatch) =>{
         const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider)
            .then(({user}) =>{
                dispatch(login(user.uid, user.displayName))
            });
    }
}


export const startLoginWithForm = (email, password, name) => {
    return (dispatch) => {
 
         const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password)
                .then( async({ user }) => {
 
                await updateProfile( user, { displayName: name });
               
 
             dispatch(login(user.uid,user.displayName))
        })
        .catch(e => {
            Swal.fire('Error',e.message,'error');
        })
    }
}

// export const startLoginEmailPassword=(email,password)=>{
//     return (dispatch) => {
 
//         const auth = getAuth();
//         signInWithEmailAndPassword(auth, email, password)
//                 .then( async({ user }) => {
//             await dispatch(login(user.uid,user.displayName))
//              console.log(user);
//         })
//         .catch((error) => {
//             console.log(error);
//         })
//     }
// }


export const startLoginEmailPassword=(email,password)=>{
    return (dispatch) => {
 
     dispatch(StartLoading());

    signInWithEmailAndPassword(auth,email,password)
     .then(({user})=>{
         console.log(user);
        dispatch(login(user.uid,user.displayName));
        dispatch(FinishLoading());
     }).catch( e=> {
         dispatch(FinishLoading());
         Swal.fire('Error',e.message,'error');
        })
    
    }
}

export const startLogout = () => {
    return async(dispatch) => {
        await signOut(auth);
        dispatch(logout());
        dispatch(noteLogout());
        
    }
}

export const logout = () => (
    {type : types.logout}
    
)

    
