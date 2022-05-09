import { db } from "../firebase/firebaseConfig";
import { collection, getDocs,query} from "@firebase/firestore"
export const loadNotes = async (uid) =>{


    const notesSnap = await getDocs(query(collection(db, `${ uid }/journal/notes`)));
     const notes = [];

     notesSnap.forEach( snapHijo => {
        notes.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
      });

      
     return notes;

}