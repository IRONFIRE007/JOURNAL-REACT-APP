import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';
import {JournalEntries} from './JournalEntries'

export const Sidebar = () => {
  const dispatch =useDispatch()
  const {name} =useSelector(state => state.auth);

  const handleAddNew =()=>{
    dispatch(startNewNote());
  }


   const handleLogut=() => {
    dispatch( startLogout());
   }

  return (
    <aside className="journal_sidebar">
      <div className="journal_sidebar-navbar">
             <h3>
              <i className="far fa-moon"></i>
                <span>{name}</span>
                </h3>

              <button className="btn btn-logout" onClick={handleLogut} >
                  Logout
              </button>
             
         
      </div>

      <div className="journal_new-entry"
      onClick={handleAddNew}
      >
          <i className="far fa-calendar-plus fa-4x" ></i>
          <p>New Entry</p>
              
          </div>
   <JournalEntries/>
          
    </aside>
  )
};
