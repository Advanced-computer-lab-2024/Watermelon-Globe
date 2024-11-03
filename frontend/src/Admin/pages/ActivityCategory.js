import { useEffect} from "react"
import ActivitycategoryDetails from "../Components/ActivitycategoryDetails"
import ActivityCategoryForm from "../Components/ActivitycategoryForm"
import { useActivityCategoryContext} from "../hooks/useActivityCategoryContext"

const ActivityCategory = () => {

    const { activitycategory, dispatch } = useActivityCategoryContext()

    useEffect(() => {
        const fetchActivitycategory = async() => {
            const response = await fetch('/api/Admin/ActivityCategory')
            const json = await response.json()

            if (response.ok){
                dispatch({type: 'SET_ACTIVITYCATEGORY', payload: json})
            }

        }

        fetchActivitycategory()
    }, [dispatch])

    return (
        <div className="activitycategory">
            <div className="workouts">
                {activitycategory && activitycategory.map((activitycategory)=>(
                    <ActivitycategoryDetails key={activitycategory._id} activitycategory={activitycategory} />
                ))}
            </div>
            <ActivityCategoryForm />
        </div>
    )
}

export default ActivityCategory