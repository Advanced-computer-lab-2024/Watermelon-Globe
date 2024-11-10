import { ComplaintContext } from "../context/ComplaintContext"
import { useContext } from "react"
export const useComplaintContext = () => {
  const context = useContext(ComplaintContext)
  if(!context) {
    throw Error('useComplaintContext must be used inside an ComplaintContextContextProvider')
  }
  return context
}