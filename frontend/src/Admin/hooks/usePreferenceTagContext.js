import { PreferenceTagContext } from "../Admin/context/PreferenceTagContext"
import { useContext } from "react"
export const usePreferenceTagContext = () => {
  const context = useContext(PreferenceTagContext)
  if(!context) {
    throw Error('usePrefenceTagContext must be used inside an PrefenceTagContextContextProvider')
  }
  return context
}