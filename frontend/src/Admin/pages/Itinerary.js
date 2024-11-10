import { useEffect} from "react"
import ItineraryDetails from "../Components/ItineraryDetails"
import { useItineraryContext} from "../hooks/useItineraryContext"

const Itinerary = () => {

    const { itinerary, dispatch } = useItineraryContext()

    useEffect(() => {
        const fetchItinerary = async() => {
            const response = await fetch('/api/Itinerary/getAllItineraries')
            const json = await response.json()

            if (response.ok){
                dispatch({type: 'SET_ITINERARY', payload: json})
            }

        }

        fetchItinerary()
    }, [dispatch])

    return (
        <div className="activitycategory">
            <div className="workouts">
                {itinerary && itinerary.map((itinerary)=>(
                    <ItineraryDetails key={itinerary._id} itinerary={itinerary} />
                ))}
            </div>
        </div>
    )
}

export default Itinerary