import { createContext, useReducer } from 'react'
export const ActivityCategoryContext = createContext()
export const activitycategoryReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ACTIVITYCATEGORY':
      return { 
        activitycategory: action.payload 
      }
    case 'CREATE_ACTIVITYCATEGORY':
      return { 
        activitycategory: [action.payload, ...state.activitycategory] 
      }
    case 'DELETE_ACTIVITYCATEGORY':
        return { 
          activitycategory: state.activitycategory.filter(a => a._id !== action.payload._id) 
      }
    case 'UPDATE_ACTIVITYCATEGORY':  // Add this case
        return {
          activitycategory: state.activitycategory.map(a => 
          a._id === action.payload._id ? action.payload : a
        )
      }
    default:
      return state
  }
}
export const ActivityCategoryContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(activitycategoryReducer, { 
    activitycategory: null
  })
  
  return (
    <ActivityCategoryContext.Provider value={{ ...state, dispatch }}>
      { children }
    </ActivityCategoryContext.Provider>
  )
}