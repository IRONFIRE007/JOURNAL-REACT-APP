import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUpLoading } from '../../actions/notes';

export const NoteAppBar = () => {

 const dispatch = useDispatch();
 const {active} = useSelector(state => state.notes);

 const   handleSave =()=>{
        
    dispatch(startSaveNote(active))
 }


const handlePictureClick= ()=>{
  document.querySelector('#fileSelector').click();
}


const handleFileChange= (e)=>{
 const file = e.target.files[0];
 if(file){
 dispatch(startUpLoading(file));
    
 }
  }

  return <div className="note_appbar"
  >
      
      <span>-- de -- ---</span>

      <input type="file" name="file" id="fileSelector" style={{display:'none'}}  onChange={handleFileChange} />
       <div>
           <button className="btn "
           onClick={handlePictureClick}
           >
               Picture
           </button>


           <button className="btn "
           onClick={handleSave}
           >
               Save
           </button>

       </div>
      
     </div>;
};
