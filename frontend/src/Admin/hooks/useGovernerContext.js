import { GovernerContext } from "../context/GovernerContext"
import { useContext } from "react"
export const useGovernerContext = () => {
  const context = useContext(GovernerContext)
  if(!context) {
    throw Error('useGovernerContext must be used inside an GovernerContextContextProvider')
  }
  return context
}