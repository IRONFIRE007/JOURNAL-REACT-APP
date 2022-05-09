import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';

export const JournalEntry = ({id,date,title,body,url}) => {

  const noteDate = moment(date);

  const dispatch =useDispatch();


  const handleEntryClick = () => {
    dispatch( activeNote(id,{date,title,body,url}))
  }

  return (
    <div className="journal-entry animate__animated animate__fadeIn animate__faster"
    onClick={handleEntryClick}
    >

    {
    url &&    <div className="journal_entry-picture"
        style={{
            backgroundSize:'cover',
            backgroundImage: `url(${url})`
        }}
       >
  
       </div>

    }

     <div className="journal_entry-body">
         <p  className="journal_entry-title"> {title} </p>
         <p  className="journal_entry-content">{body}</p>
     </div>

     <div className="journal-entry-date">
         <span>{noteDate.format("dddd")}</span>
         <h4>{noteDate.format("D")}</h4>
     </div>

    </div>
    
  )
};
