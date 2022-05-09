import { db } from "../firebase/firebaseConfig";
import { collection, addDoc,deleteDoc } from "firebase/firestore"
import { types } from "../types/types";
import { loadNotes } from "../helpers/loadNotes";
import { doc, updateDoc } from "@firebase/firestore";
import Swal from 'sweetalert2';
import { fileUpload } from "../helpers/fileUpload";

export const startNewNote =()=>{
    return async (dispatch,getState)=>{
        const uid =  getState().auth.uid
        
        const newNote={
            title:'',
            body:'',
            date:new Date().getTime()
        }

        try {
            const docRef = await addDoc(collection(db, `${uid}/journal/notes`), newNote)
           
            dispatch(activeNote(docRef.id,newNote));
            dispatch(addNewNote(docRef.id,newNote));


          } catch (e) {
            console.log(e)
          }
       

    }
}


export const activeNote =(id,note)=>(
    {  
        type:types.notesActive,
        payload:{
              id,
              ...note
        }
    
    
    }
)

export const startLoadingNotes = (uid)=>{
    return async (dispatch)=>{
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}





export const setNotes = (notes) =>({ 
    type:types.notesLoad,
    payload: notes
});


export const startSaveNote = (note) =>{
    return async (dispatch,getState) =>{
        const uid =  getState().auth.uid

        if(!note.url){
            delete note.url
          }
       
          const noteToFirestore = {...note}
          delete noteToFirestore.id
          const noteRef = doc(db, `${uid}/journal/notes/${note.id}`)
          await updateDoc(noteRef,noteToFirestore);
        
           dispatch(refreshNote(note));
           Swal.fire('SuccessFull','Note Saved','success');

    }
}

// react-journal

export const refreshNote= (note)=>({
type: types.notesUpdate,
payload : note

})



export const startUpLoading = (file)=>{
return async(dispatch,getState) =>{
     const {active:activeNote} = getState().notes

     Swal.fire({
     title:'Uploading...',
     text:'Please wait...',
     showConfirmButton:false,
      onBeforeOpen:() =>{
          Swal.showLoading()
      }
    });
     
     const fileUrl = await fileUpload(file);
     activeNote.url = fileUrl;
     dispatch (startSaveNote(activeNote))
      Swal.close();

}

}


export const startDeleting= (id)=>{

return async (dispatch,getState) =>{


    const uid = getState().auth.uid;

    const noteRef = doc(db, `${uid}/journal/notes/${id}`)
    await deleteDoc(noteRef);

    dispatch(DeleteNote(id))

}

}

export const  DeleteNote =(id)=>(
    {
       type : types.notesDelete,
       payload : id
        }
)


export const noteLogout=()=>({ 
  type: types.notesLogoutCleaning
});


export const addNewNote = (id,note)=>({
     type : types.notesAddNew,
     payload:{
          id,...note
     }
})