import { AdminContext } from "../Admin/context/AdminContext"
import { useContext } from "react"
export const useAdminContext = () => {
  const context = useContext(AdminContext)
  if(!context) {
    throw Error('useAdminContext must be used inside an AdminContextContextProvider')
  }
  return context
}