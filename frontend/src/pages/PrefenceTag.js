import { useEffect} from "react"
import PreferenceTagDetails from "../components/PreferenceTagDetails"
import PreferenceTagForm from "../components/PreferenceTagForm"
import { usePreferenceTagContext} from "../hooks/usePreferenceTagContext"

const PreferenceTag = () => {

    const { preferencetag, dispatch } = usePreferenceTagContext()

    useEffect(() => {
        const fetchPreferencetag = async() => {
            const response = await fetch('/api/Admin/PreferenceTag')
            const json = await response.json()

            if (response.ok){
                dispatch({type: 'SET_PREFERENCETAG', payload: json})
            }

        }

        fetchPreferencetag()
    }, [dispatch])

    return (
        <div className="activitycategory">
            <div className="workouts">
                {preferencetag && preferencetag.map((preferencetag)=>(
                    <PreferenceTagDetails key={preferencetag._id} preferencetag={preferencetag} />
                ))}
            </div>
            <PreferenceTagForm />
        </div>
    )
}

export default PreferenceTag