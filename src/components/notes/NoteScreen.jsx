import React, { useEffect, useRef } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { NoteAppBar } from './NoteAppBar';
import {useForm}  from '../../hooks/useForm'
import { activeNote, startDeleting } from '../../actions/notes';

export const NoteScreen = () => {


  const dispatch= useDispatch();

 

 
  const {active : note} =  useSelector(state =>state.notes);
   
  const [formValues,handleInputChange,reset]=useForm(note);

  const {body,title,id} = formValues;
  const activeId =useRef(note.id);

 useEffect(() => {
   
 if(note.id !== activeId.current){
  reset(note);
  activeId.current = note.id;
 }

 }, [note,reset]);
 

  useEffect(() => {
 
    dispatch(activeNote(formValues.id,{...formValues}));
   
  }, [formValues,dispatch]);
  

  const handleDelete = () => {
     dispatch(startDeleting(id));
    
    }
  

  return <div className="notes_main-content"
  >
    <NoteAppBar/>

     <div className="notes_content">
    <input type="text" placeholder="Some Awesomwe title" className="notes_title-input" value={title}  onChange={handleInputChange} name="title" />

   

     <textarea placeholder=""  className="notes_textarea"
      value={body} onChange={handleInputChange}
      name="body"
     >

     </textarea>

      {

        (note.url) &&

        <div className="note_image">
        <img src={note.url} alt="image" />
    </div>

      }

     </div>

     <button className="btn btn-danger"
     onClick={handleDelete}
     >
       Delete 
     </button>
     
  </div>;
};
