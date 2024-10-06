import { useState } from 'react'
import { useActivityCategoryContext} from '../hooks/useActivityCategoryContext'

const ActivityCategoryForm = () => {
  const { dispatch } = useActivityCategoryContext()

  const [activity, setActivity] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const activitycategory = {activity}
    
    const response = await fetch('/api/Admin/ActivityCategory', {
      method: 'POST',
      body: JSON.stringify(activitycategory),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()
    if (!response.ok) {
      if (json.error === 'This category already exists') {
        setError('The category you are trying to add already exists.'); // Custom error message
      }else{
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
  }
    if (response.ok) {
      setEmptyFields([])
      setError(null)
      setActivity('')
      dispatch({type: 'CREATE_ACTIVITYCATEGORY', payload: json})
    }
  }
  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Activity Category</h3>
      <label>Category:</label>
      <input 
        type="text" 
        onChange={(e) => setActivity(e.target.value)} 
        value={activity}
        className={emptyFields.includes('activity') ? 'error' : ''}
      />
      <button>Add Category</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}
export default ActivityCategoryForm