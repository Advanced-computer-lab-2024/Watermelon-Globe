import { useEffect} from "react"
import GovernerDetails from "../Components/GovernerDetails"
import GovernerForm from "../Components/GovernerForm"
import { useGovernerContext} from "../hooks/useGovernerContext"

const Governer = () => {

    const { governer, dispatch } = useGovernerContext()

    useEffect(() => {
        const fetchGoverner = async() => {
            const response = await fetch('/api/Admin/GetAllGoverner')
            const json = await response.json()

            if (response.ok){
                dispatch({type: 'SET_GOVERNER', payload: json})
            }

        }

        fetchGoverner()
    }, [dispatch])

    return (
        <div className="activitycategory">
            <div className="workouts">
                {governer && governer.map((governer)=>(
                    <GovernerDetails key={governer._id} governer={governer} />
                ))}
            </div>
            <GovernerForm />
        </div>
    )
}

export default Governer