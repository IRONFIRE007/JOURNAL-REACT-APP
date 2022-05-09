import { types } from "../types/types"

export const setError =(err)=>(
   {
    type:types.uiSetError,
    payload:err
   });

   export const removeError =()=>(
       {
        type: types.uiRemoveError
        }

   )


   export const StartLoading =()=>(
 { type: types.uiStartLoding  }
   )

   export const FinishLoading =()=>(
    {  type: types.uiFinishLoding }
      )