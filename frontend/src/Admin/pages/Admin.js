import { useEffect} from "react"
import AdminDetails from "../Components/AdminDetails"
import AdminForm from "../Components/AdminForm"
import { useAdminContext} from "../hooks/useAdminContext"

const Admin = () => {

    const { admin, dispatch } = useAdminContext()

    useEffect(() => {
        const fetchAdmin = async() => {
            const response = await fetch('/api/Admin/GetAllAdmin')
            const json = await response.json()

            if (response.ok){
                dispatch({type: 'SET_ADMIN', payload: json})
            }

        }

        fetchAdmin()
    }, [dispatch])

    return (
        <div className="activitycategory">
            <div className="workouts">
                {admin && admin.map((admin)=>(
                    <AdminDetails key={admin._id} admin={admin} />
                ))}
            </div>
            <AdminForm />
        </div>
    )
}

export default Admin