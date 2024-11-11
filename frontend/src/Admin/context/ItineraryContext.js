import { createContext, useReducer } from 'react'
export const ItineraryContext = createContext()
export const itineraryReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ITINERARY':
      return { 
        itinerary: action.payload 
      }
    default:
        return state
  }
}
export const ItineraryContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(itineraryReducer, { 
    itinerary: null
  })
  
  return (
    <ItineraryContext.Provider value={{ ...state, dispatch }}>
      { children }
    </ItineraryContext.Provider>
  )
}