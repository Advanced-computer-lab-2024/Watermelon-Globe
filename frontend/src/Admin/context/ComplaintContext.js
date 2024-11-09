import { createContext, useReducer } from 'react'
export const ComplaintContext = createContext()
export const complaintReducer = (state, action) => {
  switch (action.type) {
    case 'SET_COMPLAINT':
      return { 
        complaint: action.payload 
      }
    default:
        return state
  }
}
export const ComplaintContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(complaintReducer, { 
    complaint: null
  })
  
  return (
    <ComplaintContext.Provider value={{ ...state, dispatch }}>
      { children }
    </ComplaintContext.Provider>
  )
}