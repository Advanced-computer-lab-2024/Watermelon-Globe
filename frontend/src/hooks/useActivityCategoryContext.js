import { ActivityCategoryContext } from "../context/ActivityCategoryContext"
import { useContext } from "react"
export const useActivityCategoryContext = () => {
  const context = useContext(ActivityCategoryContext)
  if(!context) {
    throw Error('useActivityCategoryContext must be used inside an ActivityCategoryContextProvider')
  }
  return context
}