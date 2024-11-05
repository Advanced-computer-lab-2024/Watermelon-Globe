import { useState } from 'react'
import { usePreferenceTagContext} from '../hooks/usePreferenceTagContext'

const PreferenceTagForm = () => {
  const { dispatch } = usePreferenceTagContext()

  const [tag, setTag] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const preferencetag = {tag}
    
    const response = await fetch('/api/Admin/CreatePreferenceTag', {
      method: 'POST',
      body: JSON.stringify(preferencetag),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()
    if (!response.ok) {
      if (json.error === 'This tag already exists') {
        setError('The tag you are trying to add already exists.'); // Custom error message
      }else{
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
  }
    if (response.ok) {
      setEmptyFields([])
      setError(null)
      setTag('')
      dispatch({type: 'CREATE_PREFERENCETAG', payload: json})
    }
  }
  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Preference Tag</h3>
      <label>Tag:</label>
      <input 
        type="text" 
        onChange={(e) => setTag(e.target.value)} 
        value={tag}
        className={emptyFields.includes('tag') ? 'error' : ''}
      />
      <button>Add Tag</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}
export default PreferenceTagForm