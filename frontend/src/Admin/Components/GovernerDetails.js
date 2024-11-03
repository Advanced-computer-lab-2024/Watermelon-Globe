import { useGovernerContext } from '../hooks/useGovernerContext';

const GovernerDetails = ({ governer }) => {
    const { dispatch } = useGovernerContext();

    const handleClick = async () => {
      const response = await fetch('/api/Admin/Governer/' + governer._id, {
        method: 'DELETE'
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: 'DELETE_GOVERNER', payload: json });
      }
    };

    return (
      <div className="activitycategory-details">
        <h4>{governer.username}</h4>
        <span onClick={handleClick}>delete</span>
      </div>
    );
};

export default GovernerDetails;