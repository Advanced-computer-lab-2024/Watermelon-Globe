import { createContext, useReducer } from 'react'
export const GovernerContext = createContext()
export const governerReducer = (state, action) => {
  switch (action.type) {
    case 'SET_GOVERNER':
      return { 
        governer: action.payload 
      }
    case 'CREATE_GOVERNER':
      return { 
        governer: [action.payload, ...state.governer] 
      }
    case 'DELETE_GOVERNER':
        return { 
            governer: state.governer.filter(a => a._id !== action.payload._id) 
      }
    default:
      return state
  }
}
export const GovernerContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(governerReducer, { 
    governer: null
  })
  
  return (
    <GovernerContext.Provider value={{ ...state, dispatch }}>
      { children }
    </GovernerContext.Provider>
  )
}