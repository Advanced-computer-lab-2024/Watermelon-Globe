import { createContext, useReducer } from 'react'
export const PreferenceTagContext = createContext()
export const preferencetagReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PREFERENCETAG':
      return { 
        preferencetag: action.payload 
      }
    case 'CREATE_PREFERENCETAG':
      return { 
        preferencetag: [action.payload, ...state.preferencetag] 
      }
    case 'DELETE_PREFERENCETAG':
        return { 
            preferencetag: state.preferencetag.filter(a => a._id !== action.payload._id) 
      }
    case 'UPDATE_PREFERENCETAG':  // Add this case
        return {
            preferencetag: state.preferencetag.map(a => 
          a._id === action.payload._id ? action.payload : a
        )
      }
    default:
      return state
  }
}
export const PreferenceTagContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(preferencetagReducer, { 
    preferencetag: null
  })
  
  return (
    <PreferenceTagContext.Provider value={{ ...state, dispatch }}>
      { children }
    </PreferenceTagContext.Provider>
  )
}