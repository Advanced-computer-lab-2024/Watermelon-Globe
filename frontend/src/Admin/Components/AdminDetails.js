import { useAdminContext } from '../hooks/useAdminContext';

const AdminDetails = ({ admin }) => {
    const { dispatch } = useAdminContext();

    const handleClick = async () => {
      const response = await fetch('/api/Admin/Admin/' + admin._id, {
        method: 'DELETE'
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: 'DELETE_ADMIN', payload: json });
      }
    };

    return (
      <div className="activitycategory-details">
        <h4>{admin.username}</h4>
        <span onClick={handleClick}>delete</span>
      </div>
    );
};

export default AdminDetails;